import React, { useEffect, useState } from "react";
import menuData from "../data/menu.json";
import Bot from "./bot";
import { LuSalad } from "react-icons/lu";
import { PiBowlFoodBold, PiCoffeeBold, PiCakeBold } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { GrSort } from "react-icons/gr";

const App = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("original");
  const [searchQuery, setSearchQuery] = useState("");

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

  const toggleBot = () => {
    setIsBotOpen(!isBotOpen);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredMenu = menuData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.type.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const sortedMenu = filteredMenu.sort((a, b) => {
    if (sortOrder === "priceLowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "priceHighToLow") {
      return b.price - a.price;
    } else {
      return menuData.indexOf(a) - menuData.indexOf(b);
    }
  });

  return (
    <div
      className="bg-opacity-80"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/528630750/vector/fast-food-seamless-pattern.jpg?s=612x612&w=is&k=20&c=0K5fdo2xxuAIa2RzpnpQUZcszbDOo3RhgCiBDMwVZu8=')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white bg-opacity-90 shadow-lg">
        <header className="bg-white shadow p-4 items-center justify-between">
          <h1 className="text-2xl font-bold text-yellow-500">Memenu</h1>
        </header>

        {/* Menu Section */}
        <main className="p-6">
          <div className="left-4 flex justify-center bg-white rounded-lg">
            <button
              onClick={() => handleCategoryClick("All")}
              className={`flex rounded-tl-lg justify-center p-4 w-full bg-white text-gray-700 hover:bg-gray-100 ${
                selectedCategory === "All"
                  ? "bg-gray-200 border-b-2 border-yellow-500"
                  : ""
              }`}
            >
              <span className="text-lg flex items-center">
                <IoBookOutline className="mr-2" />
                All
              </span>
            </button>
            <button
              onClick={() => handleCategoryClick("Appetizer")}
              className={`flex justify-center p-4 w-full bg-white text-gray-700 hover:bg-gray-100 ${
                selectedCategory === "Appetizer"
                  ? "bg-gray-200 border-b-2 border-yellow-500"
                  : ""
              }`}
            >
              <span className="text-lg flex items-center">
                <LuSalad className="mr-2" />
                Appetizer
              </span>
            </button>
            <button
              onClick={() => handleCategoryClick("Main Dish")}
              className={`flex justify-center p-4 w-full bg-white text-gray-700 hover:bg-gray-100 ${
                selectedCategory === "Main Dish"
                  ? "bg-gray-200 border-b-2 border-yellow-500"
                  : ""
              }`}
            >
              <span className="text-lg flex items-center">
                <PiBowlFoodBold className="mr-2" />
                Main
              </span>
            </button>
            <button
              onClick={() => handleCategoryClick("Drink")}
              className={`flex justify-center p-4 w-full bg-white text-gray-700 hover:bg-gray-100 ${
                selectedCategory === "Drink"
                  ? "bg-gray-200 border-b-2 border-yellow-500"
                  : ""
              }`}
            >
              <span className="text-lg flex items-center">
                <PiCoffeeBold className="mr-2" />
                Drink
              </span>
            </button>
            <button
              onClick={() => handleCategoryClick("Dessert")}
              className={`flex rounded-tr-lg justify-center p-4 w-full bg-white text-gray-700 hover:bg-gray-100 ${
                selectedCategory === "Dessert"
                  ? "bg-gray-200 border-b-2 border-yellow-500"
                  : ""
              }`}
            >
              <span className="text-lg flex items-center">
                <PiCakeBold className="mr-2" />
                Dessert
              </span>
            </button>
          </div>

          {/* Search and Sort */}
          <div className="flex bg-white p-6 items-center gap-4">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
            <div className="flex items-center bg-white rounded-lg px-2">
              <GrSort />
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="ml-2 px-2 py-1 rounded-md border border-gray-300 focus:ring-yellow-500"
              >
                <option value="original">Original Order</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Display Menu Items */}
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 bg-white">
            {sortedMenu.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-200"
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

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
        </main>

        {/* Sliding Cart */}
        <div
          className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ width: "300px" }}
        >
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            <button
              className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1 shadow hover:bg-gray-200"
              onClick={toggleCart}
            >
              ✕
            </button>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Floating Bot Button */}
        <button
          className="fixed bottom-4 right-16 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
          onClick={toggleCart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
          </svg>
        </button>

        {/* Floating Bot Button */}
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
          onClick={toggleBot}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm6 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6 4c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>

        {/* Bot Popup */}
        {isBotOpen && (
          <div className="fixed bottom-16 right-4 bg-white p-4 rounded-lg shadow-lg">
            <Bot />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;