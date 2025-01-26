import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mosaic } from "react-loading-indicators";
import Font, { Text } from 'react-font'

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleTranslateClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/MM');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-opacity-80" style={{ backgroundImage: "url('https://i.etsystatic.com/23444619/r/il/6e873d/2895136820/il_1588xN.2895136820_aayy.jpg')", backgroundSize: 'cover'}}>
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white bg-opacity-70 p-20 rounded-3xl shadow-lg text-center" >
            <Text family='Monoton' style={{ fontSize: 55, margin: 0 }} onLoad={() => console.log('loaded Monoton')}>
        Menu Translator :)
      </Text>                <div className="flex justify-center bg-white p-8 rounded-lg shadow-lg">
                    {loading ? (
                        <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} size="medium" text="" textColor="" />
                    ) : (
                        <>
                        <div className="flex justify-center gap-4 p-4">
                            <div className="mt-4 flex flex-col justify-center border-2 border-gray-300 rounded-lg p-4 items-center">
                                <label htmlFor="language" className="block text-lg font-medium text-gray-700">Select Language:</label>
                                <select id="language" name="language" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md">
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="it">Italian</option>
                                    <option value="jp">Japanese</option>
                                    <option value="cn">Chinese</option>
                                </select>
                            </div>
                            <div className="mt-4 flex flex-col border-2 border-gray-300 rounded-lg p-4">
                                <label htmlFor="upload-image" className="block text-lg font-medium text-gray-700">Upload your menu</label>
                                <input type="file" id="upload-image" name="upload-image" accept="image/*" capture="environment" className="items-center block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md " />
                            </div>
                        <div className="flex justify-center">
                                <button type="button" onClick={handleTranslateClick} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded ">Translate</button>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default App;