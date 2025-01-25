import base64
import openai
import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Set up the OpenAI API key
openai.api_key = OPENAI_API_KEY

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def test_endpoint():
    # Path to your image
    image_path = "image_menu.jpeg"

    # Getting the Base64 string
    base64_image = encode_image(image_path)

    # Prompt to extract information
    prompt = (
        "translate the image to english and extract the menu items and their corresponding prices from this image. "
        "Return the results in a structured JSON format, where each menu item has a 'name' field , a 'description' field, a 'type' field, and a 'price' field. Exclude any unnecessary text or decorations."
    )

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

if __name__ == "__main__":
    response = test_endpoint()

    # Print the response
    if response:
        print("Extracted Menu Items:")
        print(response)
