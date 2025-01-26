# Filename - server.py

# Import flask, CORS, and datetime module for showing date and time
from flask import Flask
from flask_cors import CORS
import datetime
import json
from flask import request, jsonify

# Initializing flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# Route for seeing a data
@app.route('/data')
def get_time():

    x = datetime.datetime.now()
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }


# Define an API endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    response = get_gpt_response(prompt)
    return jsonify({"response": response})


# Route for serving menu data
@app.route('/menu', methods=['GET'])
def get_menu():
    try:
        with open('./be/image/menu_with_images.json') as menu_file:
            menu_data = json.load(menu_file)
        return jsonify(menu_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Running app

if __name__ == '__main__':
    app.run(debug=True)

