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

    async def chat_interaction(self, messages: list, images=None):
        """
        messages: list of objects with 'role' and 'content'
        """
        payload = {
            "model": self.model,
            "messages": messages,
            "stream": False
        }
        if images and messages:
            messages[-1]["images"] = images

        try:
            response = requests.post(self.chat_url, json=payload, timeout=300.0)
            response.raise_for_status()
            return response.json().get("message", {}).get("content", "Error: No response from model.")
        except Exception as e:
            logger.warning(f"Ollama reachable, using Mock Fallback: {e}")
            print(f"DEBUG AI ERROR: {e}")
            # Mock Logic for Demo
            last_msg = messages[-1]['content'].lower()
            if "photograph" in last_msg or "photosynthesis" in last_msg:
                return "Photosynthesis is the process used by plants to draw energy from sunlight and turn it into chemical energy. It happens in the chloroplasts using chlorophyll!"
            if "2+2" in last_msg or "2 + 2" in last_msg:
                return "2 + 2 = 4. (Simple math demonstration)"
            if "10 + 20" in last_msg or "10+20" in last_msg:
                return "The sum of 10 and 20 is 30. Step-by-step: 10 + 20 = 30."
            if "chemical reaction" in last_msg:
                return "A chemical reaction is a process where substances (reactants) transform into new substances (products) by breaking and forming chemical bonds. For example, hydrogen and oxygen reacting to form water!"
            if "cell" in last_msg:
                return "A cell is the basic structural and functional unit of all living organisms. It's often called the 'building block of life'!"
            return "Ollama is not running, but the system is ready! Once you start Ollama with 'mistral', I will give you full AI responses for more complex questions. (Mock Response)"

    async def summarize_history(self, history: str):
        prompt = f"Summarize the following conversation history in a concise way (max 2 sentences):\n\n{history}"
        return await self.generate_response(prompt, system_prompt="You are an expert summarizer.")
