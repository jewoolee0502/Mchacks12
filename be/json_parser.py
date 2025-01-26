from utils.gpt_wrapper import gpt_json

def trim_to_braces(input_string):
    # Find the index of the first '{' and the last '}'
    start_index = input_string.find('{')
    end_index = input_string.rfind('}')
    
    # If either brace is missing, return an empty string
    if start_index == -1 or end_index == -1 or start_index > end_index:
        return ""

    # Return the substring including and between the braces
    return input_string[start_index:end_index + 1]

def save_json_to_file(image_path, file_name):
    # Call the provided function to get the string
    string_data = gpt_json(image_path)

    string_data = trim_to_braces(string_data)
    
    # Write the string to the file
    with open(file_name, 'w') as file:
        file.write(string_data)

if __name__ == "__main__":
   image_path = './image/menu.jpg'
   save_json_to_file(image_path, "./image/menu.json")
