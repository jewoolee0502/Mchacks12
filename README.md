# MenuLens 🍽️  

**MenuLens** is a web application built for **McHacks 12** that takes an image of a menu, parses its content, and transforms it into a user-friendly format. It translates the menu into the desired language, converts prices into the selected currency, and displays detailed information such as descriptions, categories, ingredients, and images. The app also offers filters for allergies and categories, along with a shopping cart feature to view the final price.

## 🎯 Purpose  

This project aims to improve accessibility and inclusivity in the dining experience by bridging language and currency barriers for travelers, expats, and anyone exploring diverse cuisines.  

## 📦 Installation  

### Backend Setup

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/MenuLens.git
   cd MenuLens
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a .env file in the backend folder with the following contents:
   ```bash
   OPENAI_API_KEY=the-key
   PEXELS_API_KEY=the-key
   CURRENCY_FREAKS_API_KEY=the-key```
