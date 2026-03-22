from typing import List, Dict
from services.ai_service import AIService

class ContextManager:
    def __init__(self, ai_service: AIService, threshold: int = 10, retention: int = 3):
        self.ai_service = ai_service
        self.threshold = threshold
        self.retention = retention

    async def get_optimized_context(self, messages: List[Dict], current_summary: str = None):
        """
        [CONTEXT PRUNING TECHNIQUE]
        Implements a sliding window + recursive summarization to strip irrelevant history 
        and minimize token count. This ensures high-speed responses and lowest computational 
        cost for local hardware in rural India.
        """
        if len(messages) <= self.threshold:
            return messages, current_summary

        # We need to prune/summarize
        to_summarize = messages[:-self.retention]
        keep = messages[-self.retention:]

        history_str = "\n".join([f"{m['role']}: {m['content']}" for m in to_summarize])
        if current_summary:
            history_str = f"Previous Summary: {current_summary}\n\nRecent History:\n{history_str}"

        new_summary = await self.ai_service.summarize_history(history_str)
        
        processed_messages = [
            {"role": "system", "content": f"Previous conversation summary: {new_summary}"}
        ] + keep
        
        return processed_messages, new_summary
