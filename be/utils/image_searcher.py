import base64
import openai
import os
from dotenv import load_dotenv

# Set up the OpenAI API key
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

def gpt_json(image_path):
       # Getting the Base64 string
   base64_image = encode_image(image_path)

   #Prompt to extract information
   prompt = """{"
         "You are a food and language expert. You are given a name of a menu or dish. You tasked with extracting 5 image urls of the menu."
   }
    """


   response = openai.ChatCompletion.create(
       model="gpt-4o-mini",
       messages=[
           {
               "role": "user",
               "content": [
                   {
                       "type": "text",
                       "text": prompt,
                   },
                   {
                       "type": "image_url",
                       "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                   },
               ],
           }
       ],
   )


   return response.choices[0]['message']['content']

# Modify the query for better food-related searches
def get_pexels_image(query):
    

if __name__ == "__main__":
    # Example usage
    print(get_google_images("Fries"))