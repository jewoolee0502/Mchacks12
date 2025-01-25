import React, { useEffect, useState } from "react";
import menuData from "../data/menu.json";

const App = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("/data/menu.json")
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity }]);
    handleClosePopup();
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-gray-300 min-h-screen relative">
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
                className="flex items-center justify-between mb-6 border-b pb-4 cursor-pointer"
                onClick={() => handleItemClick(item)}
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

      {/* Popup for Selected Item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1 shadow-md hover:bg-gray-200"
              onClick={handleClosePopup}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedItem.name}</h3>
            <p className="text-gray-500 mb-4">{selectedItem.description}</p>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-32 h-32 rounded-full mb-4"
            />
            <p className="text-lg font-semibold mb-4">${selectedItem.price.toFixed(2)}</p>
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={decrementQuantity}
                className="w-8 h-8 bg-gray-200 text-gray-700 rounded flex items-center justify-center hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-gray-800 text-lg">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="w-8 h-8 bg-gray-200 text-gray-700 rounded flex items-center justify-center hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => addToCart(selectedItem)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart Button */}
      <button
        className="fixed top-1/2 right-0 bg-yellow-500 text-white px-4 py-2 rounded-l-lg hover:bg-yellow-600"
        onClick={toggleCart}
      >
        Cart
      </button>

      {/* Sliding Cart */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: '300px' }}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-lg font-semibold">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

