import React, { useEffect, useState } from "react";
import menuData from "../data/menu.json";
import Bot from "./bot";
import { LuSalad } from "react-icons/lu";
import { PiBowlFoodBold, PiCoffeeBold, PiCakeBold } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { GrSort } from "react-icons/gr";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineSupportAgent } from "react-icons/md";

const App = () => {
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("original");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCheckout, setShowCheckout] = useState(false); // New state for checkout
  const [selectedAllergy, setSelectedAllergy] = useState(""); // New state for selected allergy

  const fetchMenuData = async () => {
      try {
          const response = await fetch("http://localhost:5000/menu");
          const result = await response.json();
          setData(result); // Set the entire data object
      } catch (error) {
          console.error("Error fetching menu:", error);
      }
  };

  useEffect(() => {
      fetchMenuData();
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

  const handleAllergyChange = (e) => {
    setSelectedAllergy(e.target.value);
  };

  const filteredMenu = data.items?.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.Category.join(', ').toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = item["Dish Title"].toLowerCase().includes(searchQuery);
    const matchesAllergy = selectedAllergy === "" || !item["Allergy tags"].includes(selectedAllergy);
    return matchesCategory && matchesSearch && matchesAllergy;
  });

  const sortedMenu = filteredMenu?.sort((a, b) => {
    if (sortOrder === "priceLowToHigh") {
      return a.Price - b.Price;
    } else if (sortOrder === "priceHighToLow") {
      return b.Price - a.Price;
    } else {
      return data.items.indexOf(a) - data.items.indexOf(b);
    }
  });

  const handleCheckout = () => {
    setShowCheckout(true);
  };

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
        <header className="flex justify-between bg-white bg-opacity-60 shadow p-4 items-center">
          <h1 className="text-2xl px-2 font-bold text-yellow-500">Memenu Lens</h1>
          <button
            className="bg-gray-300 text-black p-4 rounded-md shadow-lg hover:bg-gray-400"
            onClick={toggleCart}
          >
            <CgShoppingCart />
          </button>
        </header>

        {/* Menu Section */}
        <main className="p-6">
          <div className="left-4 flex justify-center bg-white bg-opacity-60 rounded-lg">
            <button
              onClick={() => handleCategoryClick("All")}
              className={`flex rounded-tl-lg justify-center p-4 w-full bg-white bg-opacity-60 text-gray-700 hover:bg-gray-100 ${
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
              onClick={() => handleCategoryClick("Main Courses")}
              className={`flex justify-center p-4 w-full bg-white text-gray-700 hover:bg-gray-100 ${
                selectedCategory === "Main Courses"
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
              onClick={() => handleCategoryClick("Beverages")}
              className={`flex justify-center p-4 w-full bg-white text-gray-700 hover:bg-gray-100 ${
                selectedCategory === "Beverages"
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

          {/* Search, Sort, and Allergy Filter */}
          <div className="flex bg-white bg-opacity-60 p-6 items-center gap-4">
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
                <option value="original">Featured</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>
            <div className="flex items-center bg-white rounded-lg px-2">
              <label htmlFor="allergy-select" className="mr-2">Allergy</label>
              <select
                id="allergy-select"
                value={selectedAllergy}
                onChange={handleAllergyChange}
                className="px-2 py-1 rounded-md border border-gray-300 focus:ring-yellow-500"
              >
                <option value="">None</option>
                <option value="Gluten">Gluten</option>
                <option value="Dairy">Dairy</option>
                <option value="Nuts">Nuts</option>
              <option value="Seafood">Seafood</option>
              </select>
            </div>
          </div>

          {/* Display Menu Items */}
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 bg-white bg-opacity-60">
            {sortedMenu?.map((item) => (
              <div key={item.id} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 relative" onClick={() => handleItemClick(item)}>
                <div className="">
                  <h2 className="text-lg px-2 mt-2 font-bold">{item["Dish Title"]}</h2>
                  <h3 className="text-sm text-gray-500 px-2">{item["Original Title"]}</h3>
                    <span className="font-semibold px-2">${item.Price}</span>
                  <div className="mt-4 relative">
                    <img
                      src={item["Image"][0]}
                      alt={item["Dish Title"]}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-center text-black font-semibold">{item.Description}</h3>
                    </div>
                  </div>
                  <div className="text-xl text-gray-500">
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popup for Selected Item */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg relative ">
                <button
                  className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1 shadow-md hover:bg-gray-200"
                  onClick={handleClosePopup}
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold mb-2">{selectedItem["Dish Title"]}</h3>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex justify-center items-center">
                <img
                  src={selectedItem.Image[0]}
                  alt={selectedItem["Dish Title"]}
                  className="w-48 h-48 mb-4"
                />
                                <img
                  src={selectedItem.Image[1]}
                  alt={selectedItem["Dish Title"]}
                  className="w-48 h-48 mb-4"
                />
                  </div>
                <div className="flex justify-center items-center">
                                <img
                  src={selectedItem.Image[2]}
                  alt={selectedItem["Dish Title"]}
                  className="w-48 h-48 mb-4"
                />
                                <img
                  src={selectedItem.Image[3]}
                  alt={selectedItem["Dish Title"]}
                  className="w-48 h-48 mb-4"
                />
                </div>

                </div>
                <p className="text-gray-500 mb-1">{selectedItem.Description}</p>
                <p className="text-gray-500 mb-1">Major Ingredient in this dish: {selectedItem.Ingredients.join(', ')}</p>
                <p className="text-gray-500 mb-4">Allergy to be aware of: {selectedItem["Allergy tags"].join(', ')}</p>
                <p className="text-2xl font-semibold mb-4">${selectedItem.Price.toFixed(2)}</p>
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
          className={`fixed top-0 right-0 h-full bg-white bg-opacity-80 shadow-lg transform transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ width: "300px" }}
        >
          <div className="p-4">
            <h2 className="bg-white bg-opacity-60 border border-gray-200 text-center px-4 py-1 rounded-lg text-2xl font-bold mb-4">Cart</h2>
            <button
              className="absolute top-2 px-2 right-2 bg-white text-gray-700 rounded-full p-1 shadow hover:bg-gray-200"
              onClick={toggleCart}
            >
              ✕
            </button>
            {cart.length === 0 ? (
              <div className="flex justify-center items-center h-full bg-white rounded-lg p-2 bg-opacity-80">
                <p className="text-gray-500">Your cart is empty.</p>
              </div>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="mb-4 bg-white bg-opacity-80 rounded-lg p-2">
                    <h3 className="text-lg font-semibold bg">{item["Dish Title"]}</h3>
                    <p className="text-gray-500">
                      ${item.Price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                ))}
                <button
                  className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                {showCheckout && (
                  <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold">Checkout Details</h3>
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item["Original Title"]}</span>
                        <span>${(item.Price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <h4 className="font-semibold mt-2">Total: ${cart.reduce((total, item) => total + (item.Price * item.quantity), 0).toFixed(2)}</h4>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Floating Bot Button */}
        <button
          className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-400"
          onClick={toggleBot}
        >
          <MdOutlineSupportAgent />
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