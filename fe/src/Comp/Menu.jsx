import React, { useState } from "react";

const menuItems = [
  {
    name: "Ocean Deli Special Pizza Small",
    description: "Hamburger, Sausage, Pepperoni, Red Onion, Peppers, Mushrooms",
    price: 12.50,
    imageUrl: "https://www.pexels.com/photo/white-ceramic-plate-on-table-5605620/", // Replace with the actual pizza image URL
    altText: "Ocean Deli Pizza"
  },
  // Add more items as needed
];

const MenuItem = ({ item, quantity, incrementQuantity, decrementQuantity }) => (
  <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    {/* Image Section */}
    <div className="relative">
      <img
        src={item.imageUrl}
        alt={item.altText}
        className="w-full h-64 object-cover"
      />
      <button className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1 shadow-md hover:bg-gray-200">
        ✕
      </button>
    </div>

    {/* Content Section */}
    <div className="p-4">
      <h4 className="text-gray-500 text-sm">{item.altText}</h4>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
      <p className="text-xl text-gray-700 mb-4">${item.price.toFixed(2)}</p>

      {/* Tabs */}
      <div className="flex justify-between border-b mb-4">
        <button className="text-gray-700 font-medium py-2 border-b-2 border-black">
          DETAILS
        </button>
      </div>

      {/* Details */}
      <p className="text-gray-600 text-sm mb-4">{item.description}</p>

      {/* Extras */}
      <div className="flex items-center justify-between mt-6">
        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
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

        <button className="flex-1 ml-4 bg-green-500 text-white text-lg font-medium py-2 px-4 rounded-lg hover:bg-green-600">
          Add to Order <span className="ml-2">${(item.price * quantity).toFixed(2)}</span>
        </button>
      </div>
    </div>
  </div>
);

const Menu = () => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
          quantity={quantity}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      ))}
    </div>
  );
};

export default Menu;