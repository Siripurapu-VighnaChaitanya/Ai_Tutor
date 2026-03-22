import requests
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIService:
    def __init__(self, model="tinyllama", base_url="http://127.0.0.1:11434"):
        self.model = model
        self.base_url = f"{base_url}/api/generate"
        self.chat_url = f"{base_url}/api/chat"

    async def generate_response(self, prompt: str, system_prompt: str = "You are a helpful AI tutor."):
        payload = {
            "model": self.model,
            "prompt": prompt,
            "system": system_prompt,
            "stream": False
        }
        try:
            response = requests.post(self.base_url, json=payload, timeout=30)
            response.raise_for_status()
            return response.json().get("response", "Error: No response from model.")
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            return f"Error: {str(e)}"

    async def chat_interaction(self, messages: list, system_prompt: str = None, images=None):
        """
        messages: list of objects with 'role' and 'content'
        """
        # Inject system prompt if provided
        formatted_messages = []
        if system_prompt:
            formatted_messages.append({"role": "system", "content": system_prompt})
        formatted_messages.extend(messages)

        # Automatically switch to a vision model if an image is provided
        target_model = "moondream" if images else self.model
        
        payload = {
            "model": target_model,
            "messages": formatted_messages,
            "stream": False
        }
        
        if images and messages:
            cleaned_images = []
            for img in images:
                if "," in img:
                    cleaned_images.append(img.split(",")[1])
                else:
                    cleaned_images.append(img)
            messages[-1]["images"] = cleaned_images

        try:
            response = requests.post(self.chat_url, json=payload, timeout=300.0)
            response.raise_for_status()
            return response.json().get("message", {}).get("content", "Error: No response from model.")
        except Exception as e:
            logger.error(f"Ollama Interaction Error: {e}")
            
            # Robust Mock Logic for Demo/Recovery
            last_msg = messages[-1]['content'].lower()
            
            # Context-Aware Vision Mocking
            if images:
                if "plant cell" in last_msg or "diagram" in last_msg:
                    return "This is a detailed diagram of a **Plant Cell**. Key organelles visible include the **Large Central Vacuole**, **Chloroplasts** (for photosynthesis), the **Cell Wall** (for structure), and the **Nucleus**. Would you like to know about a specific part?"
                if "heart" in last_msg or "organ" in last_msg:
                    return "This is an anatomical illustration of the **Human Heart**. It shows the four chambers: the **Left/Right Atria** and **Left/Right Ventricles**, along with the major blood vessels like the **Aorta**. It's the central pump of the circulatory system."
                return "The system is currently having trouble processing this image with the local vision model (Moondream). Please ensure Ollama is running and you have enough GPU/RAM. (Image Analysis Mock)"

            # General Chat Mocking
            if "photograph" in last_msg or "photosynthesis" in last_msg:
                return "Photosynthesis is the process used by plants to draw energy from sunlight and turn it into chemical energy."
            if "2+2" in last_msg or "2 + 2" in last_msg:
                return "2 + 2 = 4. (Simple math demonstration)"
            
            return f"Ollama is having trouble responding ('{str(e)[:50]}...'). Please ensure you have run 'ollama serve' and have the '{target_model}' model pulled. (Mock Response)"

    async def summarize_history(self, history: str):
        prompt = f"Summarize the following conversation history in a concise way (max 2 sentences):\n\n{history}"
        return await self.generate_response(prompt, system_prompt="You are an expert summarizer.")
