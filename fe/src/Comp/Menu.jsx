import React from "react";
import menuData from "../data/menu.json";
  
const Menu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center">
      <div className="w-3/4 bg-white rounded-lg shadow-lg">
        {/* Top Navigation */}
        <div className="bg-gray-800 text-yellow-400 py-4 px-6 flex justify-around rounded-t-lg">
          <div className="text-center">
            <div className="mb-1">🍣</div>
            <p className="uppercase text-sm">Roll</p>
          </div>
          <div className="text-center">
            <div className="mb-1 border-b-2 border-yellow-400">🍣</div>
            <p className="uppercase text-sm">Sushi</p>
          </div>
          <div className="text-center">
            <div className="mb-1">🍜</div>
            <p className="uppercase text-sm">Noodle</p>
          </div>
          <div className="text-center">
            <div className="mb-1">🍶</div>
            <p className="uppercase text-sm">Drinks</p>
          </div>
        </div>
        {/* Menu List */}
        <div className="p-6">
          {menuData.map((item, index) => (
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
      </div>
    </div>
  );
};

export default Menu;