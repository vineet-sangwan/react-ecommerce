import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search || ""); // Fallback to empty string if undefined

  useEffect(() => {
    const fetchProductsFromAPI = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsFromAPI();
  }, []);

  const addItemsToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.title} added to cart!`);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Header and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-4 px-6 rounded-lg shadow-lg text-center lg:text-left">
          Product List
        </h2>
        <div className="mt-6 lg:mt-0 lg:w-1/2 lg:ml-6">
          <SearchBar />
        </div>
      </div>

      {/* Product Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {product.title}
              </h3>
              <p className="text-xl font-bold text-green-600 mb-4">
                ${product.price}
              </p>
              <div className="flex flex-col space-y-3 w-full">
                <button
                  onClick={() => addItemsToCart(product)}
                  className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
                <Link to={`/products/${product.id}`}>
                  <button className="w-full py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:bg-gradient-to-l hover:from-teal-600 hover:to-green-500 transition-all duration-300 transform hover:scale-105">
                    More Info
                  </button>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
