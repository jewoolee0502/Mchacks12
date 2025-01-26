import json
from image_searcher import get_pexels_images

def image_inserter(file_name, modified_file_name):
    # Load JSON file
    with open(file_name, "r") as file:
        data = json.load(file)

    # Iterate through each item and update the "Image" attribute
    for item in data["items"]:
        dish_title = item["Dish Title"]  # Get the Dish Title
        image_links = get_pexels_images(dish_title)  # Call get_pexels_images
        item["Image"].extend(image_links)  # Add the returned links to the "Image" attribute

    # Save the updated JSON back to the file
    with open(modified_file_name, "w") as file:
        json.dump(data, file, indent=4)  # Save the updated JSON with indentation for readability

if __name__ == "__main__":
    # Example usage
    image_inserter("image_menu.json", "menu_with_images.json")
