from typing import List, Dict, Tuple
from services.ai_service import AIService
from services.textbook_service import TextbookService

class ContextManager:
    def __init__(self, ai_service: AIService, threshold: int = 10, retention: int = 3):
        self.ai_service = ai_service
        self.textbook_service = TextbookService()
        self.threshold = threshold
        self.retention = retention

    async def get_optimized_context(self, messages: List[Dict], subject: str = "General", current_summary: str = None) -> Tuple[List[Dict], str, dict]:
        """
        [CONTEXT PRUNING ENGINE]
        1. Strips irrelevant textbook chapters (Textbook Pruning).
        2. Summarizes distance conversation history (History Pruning).
        """
        # A. Textbook Context Pruning
        last_query = messages[-1]['content'] if messages else ""
        relevant_chapter = self.textbook_service.get_relevant_chapter(last_query, subject)
        
        pruning_stats = {
            "chapter_found": relevant_chapter["title"] if relevant_chapter else None,
            "chapters_stripped": len(self.textbook_service.textbooks.get(subject, [])) - (1 if relevant_chapter else 0)
        }

        # B. History Pruning / Summarization
        if len(messages) <= self.threshold:
            processed_messages = messages
            new_summary = current_summary
        else:
            to_summarize = messages[:-self.retention]
            keep = messages[-self.retention:]

            history_str = "\n".join([f"{m['role']}: {m['content']}" for m in to_summarize])
            if current_summary:
                history_str = f"Previous Summary: {current_summary}\n\nRecent History:\n{history_str}"

            new_summary = await self.ai_service.summarize_history(history_str)
            processed_messages = [
                {"role": "system", "content": f"Previous conversation summary: {new_summary}"}
            ] + keep
        
        # C. Inject Pruned Textbook Context
        if relevant_chapter:
            textbook_context = f"[TEXTBOOK CONTEXT (Pruned to Chapter {relevant_chapter['chapter']}): {relevant_chapter['title']}]\n{relevant_chapter['content']}"
            processed_messages.insert(0, {"role": "system", "content": textbook_context})

        return processed_messages, new_summary, pruning_stats
