import base64
import openai
import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")  # Pexels API key

# Set up OpenAI API key
openai.api_key = OPENAI_API_KEY

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

# Function to search for an image on Pexels
def search_food_image(dish_title):
    url = "https://api.pexels.com/v1/search"
    headers = {"Authorization": PEXELS_API_KEY}
    params = {"query": dish_title, "per_page": 1}  # Get the top result

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        if data["photos"]:
            return data["photos"][0]["src"]["medium"]  # Return the medium-sized image URL
    return None  # Return None if no image is found

# Function to get menu details from OpenAI
def test_endpoint():
    # Path to the menu image
    image_path = "Mchacks12/be/image_menu.jpeg"

    # Convert image to Base64
    base64_image = encode_image(image_path)

    # OpenAI Prompt
    prompt = """{"
        "You are a food and language expert. Your task is to extract menu items from the given image and provide structured JSON output."
        
        "Each menu item should have the following fields:"
        "1. Original Title: Extracted from the image."
        "2. Dish Title: A meaningful English translation."
        "3. Price: Extracted from the image."
        "4. Description: Extracted or inferred from the image."
        "5. Ingredients: Extracted or inferred (provide key ingredients)."
        "6. Category: Choose from (Appetizers, Main Courses, Sides, Beverages, Desserts)."
        "7. Allergy tags: Select from (Peanuts, Treenuts, Milk, Eggs, Shellfish, Wheat, Soy, Fish, Gluten, Lactose)."
        "8. Image: Leave this field empty."
        "9. id: Unique identifier."
        
        "IMPORTANT: Leave the Image field empty so that we can fetch it separately."
        
        "If the image is unclear and less than two items can be extracted, return a warning message requesting a clearer image."
        
        "Your response should be structured in valid JSON format with the specified fields."
    }"""

    # OpenAI API call
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

    return response.choices[0]["message"]["content"]

if __name__ == "__main__":
    response = test_endpoint()

    if response:
        print("Extracted Menu Items:")

        try:
            parsed_data = json.loads(response)  # Parse JSON response
            print(json.dumps(parsed_data, indent=4))  # Pretty print JSON

            # Add Pexels image search results
            if "items" in parsed_data:
                for item in parsed_data["items"]:
                    dish_title = item.get("Dish Title", "")
                    if dish_title:
                        image_url = search_food_image(dish_title)  # Get food image from Pexels
                        item["Image"] = image_url if image_url else "No image found"

            # Pretty-print updated JSON with images
            print("\nUpdated Menu Items with Food Images:")
            print(json.dumps(parsed_data, indent=4))

        except json.JSONDecodeError:
            print("Error: Response is not valid JSON.")
            print(response)
