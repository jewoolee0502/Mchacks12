import React, { useEffect, useState } from "react";
import menuData from "../data/menu.json";

const App = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/path/to/menu.json")
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gray-300 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-yellow-500">Memenu</h1>
        <nav className="flex gap-6 text-gray-700">
          <a href="#home" className="hover:text-yellow-500">Home</a>
          <a href="#foods" className="hover:text-yellow-500">Foods</a>
          <a href="#about" className="hover:text-yellow-500">About</a>
          <a href="#contact" className="hover:text-yellow-500">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="#offers" className="text-yellow-500 font-bold hover:underline">Offers</a>
          <button className="bg-black text-white px-4 py-2 rounded">Log In</button>
        </div>
      </header>

      {/* Banner */}
      <section className="bg-yellow-400 text-white p-8 text-center">
        <h2 className="text-lg">Get your food now</h2>
      </section>

      {/* Menu Section */}
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6">Our Menu</h2>

        {/* Categories */}
        <div className="flex gap-4 mb-8">
          {["All", "Appetizer", "Main Dish", "Drink", "Dessert"].map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`p-4 rounded-lg shadow bg-white text-gray-700 hover:bg-gray-100 ${selectedCategory === category ? 'bg-gray-200' : ''}`}
            >
              <span className="text-lg">{category}</span>
            </button>
          ))}
        </div>

        {/* Display Selected Category Items */}
        <div className="p-6">
          {menuData
            .filter(item => selectedCategory === "All" || item.type.toLowerCase() === selectedCategory.toLowerCase())
            .map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-6 border-b pb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default App;