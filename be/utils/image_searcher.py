import openai
import requests
import os
from dotenv import load_dotenv

# Load API keys from .env file
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")

openai.api_key = OPENAI_API_KEY

def enhance_dish_search_query(dish_name):
    """Use GPT-4o to generate a better image search query."""
    prompt = f"""
    You are an AI assistant specialized in food images.
    The user is looking for **high-quality images** of the dish called **"{dish_name}"**.
    
    **Your Task:**
    - Modify the dish name to make it more **specific** for an image search.
    - Include relevant keywords (e.g., ingredients, presentation style, cuisine).
    - Make sure food is the main focus of the image
    - You tasked with extracting 5 image urls of the dish. searched from google images.
    - Make sure the image is the cuisine from that language's origin
    
    **Example Output:**
    - "Authentic Italian Spaghetti Carbonara with creamy sauce"
    - "Classic Neapolitan-style Margherita Pizza with fresh basil and mozzarella"
    
    **Return only the modified query as a plain string.**
    """

    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
    )

    return response.choices[0]["message"]["content"].strip()

def get_pexels_images(query, num_results=5):
    """Fetch high-quality dish images from Pexels API."""
    url = f"https://api.pexels.com/v1/search?query={query}&per_page={num_results}"
    headers = {"Authorization": PEXELS_API_KEY}
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        image_urls = [photo["src"]["original"] for photo in data.get("photos", [])]
        return image_urls if image_urls else ["No images found."]
    else:
        return f"Error {response.status_code}: {response.json()}"

def get_dish_image_urls(dish_name):
    """Enhance dish name using GPT-4 and fetch real image URLs from Pexels."""
    enhanced_query = enhance_dish_search_query(dish_name)
    image_urls = fetch_pexels_images(enhanced_query)
    print(image_urls)
    return {
        "dish": dish_name,
        "enhanced_query": enhanced_query,
        "images": image_urls
    }

if __name__ == "__main__":
    # Example: Find images for "Spaghetti Carbonara"
    print(get_dish_image_urls("Spaghetti Carbonara"))
