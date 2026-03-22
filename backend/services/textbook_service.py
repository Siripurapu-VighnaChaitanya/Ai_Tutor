import logging

logger = logging.getLogger(__name__)

class TextbookService:
    def __init__(self):
        # Simulated State-Board Textbook Data
        self.textbooks = {
            "Science": [
                {
                    "chapter": 1,
                    "title": "Photosynthesis and Plant Life",
                    "content": "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll. It involves the conversion of light energy into chemical energy. The equation is 6CO2 + 6H2O + light -> C6H12O6 + 6O2. Chloroplasts are the primary site of this process."
                },
                {
                    "chapter": 2,
                    "title": "Human Anatomy: The Heart",
                    "content": "The human heart is a muscular organ about the size of a fist, located just behind and slightly left of the breastbone. The heart pumps blood through the network of arteries and veins called the cardiovascular system. It has four chambers: Left Atrium, Right Atrium, Left Ventricle, and Right Ventricle."
                },
                {
                    "chapter": 3,
                    "title": "Cell Biology: The Unit of Life",
                    "content": "The cell is the basic structural, functional, and biological unit of all known organisms. Cells are the smallest units of life. Animal cells and plant cells have common features like the nucleus and mitochondria, but plant cells uniquely possess a cell wall and chloroplasts."
                }
            ],
            "Math": [
                {
                    "chapter": 1,
                    "title": "Basic Arithmetic and Equations",
                    "content": "Arithmetic is a branch of mathematics that consists of the study of numbers, especially the properties of the traditional operations: addition, subtraction, multiplication, division, exponentiation and extraction of roots. Linear equations are first-degree equations."
                },
                {
                    "chapter": 2,
                    "title": "Geometry and Shapes",
                    "content": "Geometry is a branch of mathematics concerned with properties of space that are related with distance, shape, size, and relative position of figures. Area of a circle is $\\pi r^2$. Volume of a cube is $s^3$."
                }
            ]
        }

    def get_relevant_chapter(self, query: str, subject: str) -> dict:
        """
        [CONTEXT PRUNING ENGINE]
        Searches through textbook chapters for the given subject and returns ONLY the most relevant one.
        This 'prunes' away all irrelevant chapters before sending them to the LLM.
        """
        subject_books = self.textbooks.get(subject, [])
        if not subject_books:
            # Fallback to General/No Chapter
            return None
        
        query_lower = query.lower()
        best_match = None
        max_hits = 0

        for chapter in subject_books:
            # Simple keyword hit counter (Pruning Logic)
            keywords = chapter["title"].lower().split() + chapter["content"].lower().split()
            hits = sum(1 for kw in keywords if kw in query_lower and len(kw) > 3)
            
            if hits > max_hits:
                max_hits = hits
                best_match = chapter
        
        if best_match:
            logger.info(f"Context Pruning Result: Selected Chapter {best_match['chapter']} - {best_match['title']}")
            return best_match
        
        return None
