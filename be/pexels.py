import requests
import os
from dotenv import load_dotenv

# Load pexels API key
load_dotenv()
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
API_KEY = PEXELS_API_KEY

def get_pexels_image(query):
    url = f'https://api.pexels.com/v1/search?query={query}&per_page=5'
    headers = {'Authorization': API_KEY}
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        image_urls = []
        
        # Add the image URLs to the list, or add the placeholder if not found
        for i in range(5):
            if i < len(data['photos']):
                image_urls.append(data['photos'][i]['url'])
            else:
                image_urls.append("https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg")
        
        return image_urls
    else:
        return f"Error: {response.status_code}"

# Example usage
image_url = get_pexels_image("Burger")
print(f"Top image URL: {image_url}")
