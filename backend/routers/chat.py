from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import SessionLocal, Conversation, Message
from services.ai_service import AIService
from services.context_manager import ContextManager
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    subject: str = "General"
    language: str = "English"
    image: Optional[str] = None  # Base64 encoded image

ai_service = AIService()
context_manager = ContextManager(ai_service)

@router.post("/chat")
async def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    # 1. Get or create conversation
    if request.conversation_id:
        conversation = db.query(Conversation).filter(Conversation.id == request.conversation_id).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conversation = Conversation(title=f"Chat on {request.subject}")
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # 2. Add user message
    user_msg = Message(conversation_id=conversation.id, role="user", content=request.message)
    db.add(user_msg)
    db.commit()

    # 3. Get history for context
    all_messages = db.query(Message).filter(Message.conversation_id == conversation.id).order_by(Message.timestamp.asc()).all()
    history = [{"role": m.role, "content": m.content} for m in all_messages]

    # 4. Context Pruning
    processed_history, new_summary = await context_manager.get_optimized_context(history, conversation.summary)
    
    if new_summary != conversation.summary:
        conversation.summary = new_summary
        db.commit()

    # 5. System Prompt based on Subject & Language
    system_prompt = f"You are a helpful AI tutor for {request.subject}. "
    if request.language == "Hindi":
        system_prompt += "Respond primarily in Hindi. If explaining complex concepts, provide the English terms in brackets."
    else:
        system_prompt += "Respond in clear, simple English."
    
    # 6. Generate AI Response
    ai_response_content = await ai_service.chat_interaction(
        processed_history, 
        images=[request.image] if request.image else None
    )

    # 7. Save AI message
    ai_msg = Message(conversation_id=conversation.id, role="assistant", content=ai_response_content)
    db.add(ai_msg)
    db.commit()

    return {
        "conversation_id": conversation.id,
        "response": ai_response_content,
        "summary": conversation.summary
    }

@router.get("/conversations")
async def get_conversations(db: Session = Depends(get_db)):
    return db.query(Conversation).all()

@router.get("/conversations/{conv_id}")
async def get_conversation_messages(conv_id: int, db: Session = Depends(get_db)):
    return db.query(Message).filter(Message.conversation_id == conv_id).all()
