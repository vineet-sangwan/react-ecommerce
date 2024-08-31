import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ClothesData } from "./MensClothing";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const MensClothings = () => {
  const [mensClothes, setMensClothes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setMensClothes(ClothesData);
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch the action to add the product to the cart
    alert(`${product.title} added to cart!`);
  };

  const handleBuyNow = (productId) => {
    navigate(`/products/${productId}`); // Navigate to the product detail page
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4 ml-5 mx-auto text-center font-extralight border border-white bg-black rounded-lg text-white drop-shadow-xl p-4">
        Summer Special Mens Clothing Discounted
      </h2>
      <div className="hidden lg:block">
        {/* Desktop View */}
        <Slider {...sliderSettings}>
          {mensClothes.map((product) => (
            <div key={product.id} className="p-4">
              <div className="flex flex-col h-full min-h-[300px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0 h-48 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col">
                  <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold text-gray-700 mt-1">
                    ${product.price}
                  </p>
                  <div className="mt-auto flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-500 transition ease-in-out duration-300"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product.id)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg w-full hover:bg-green-500 transition ease-in-out duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 gap-4">
        {/* Mobile View */}
        {mensClothes.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-sm font-bold text-gray-700 mt-1">
              ${product.price}
            </p>
            <div className="mt-2 flex flex-col space-y-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="px-2 py-1 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-500 transition ease-in-out duration-300"
              >
                Add To Cart
              </button>
              <button
                onClick={() => handleBuyNow(product.id)}
                className="px-2 py-1 bg-green-600 text-white rounded-lg w-full hover:bg-green-500 transition ease-in-out duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MensClothings;
