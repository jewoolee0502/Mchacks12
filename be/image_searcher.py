import requests
import os
from dotenv import load_dotenv

# Load pexels API key
load_dotenv()
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
API_KEY = PEXELS_API_KEY

def call_pexels_api(query):
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

# Modify the query below whereas needed
def get_pexels_images(query):
    modified_query = "food " + query
    return call_pexels_api(modified_query)


if __name__ == "__main__":
    # Example usage
    print(get_pexels_images("Fries"))
