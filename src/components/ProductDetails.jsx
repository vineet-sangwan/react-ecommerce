import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      alert(`${product.title} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(addToCart(product)); // Add the product to the cart
      navigate("/checkout"); // Redirect to the checkout page
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {product && (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 flex-shrink-0">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-2">{product.title}</h2>
              <p className="text-lg text-gray-700 mb-4">
                {product.description}
              </p>
              <p className="text-2xl font-bold text-blue-600 mb-6">
                ${product.price}
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-teal-600 hover:to-green-500 transition-all duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
