import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import empty from "../assets/empty.jpg";
import { MdOutlineShoppingCart } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen flex flex-col">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center flex-grow mt-12">
          <MdOutlineShoppingCart size={64} className="text-gray-400 mb-4" />
          <h2 className="text-3xl font-semibold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            It looks like you haven't added anything to your cart yet.
          </p>
          <img
            src={empty}
            alt="Empty cart"
            className="w-80 h-auto rounded-lg shadow-lg mb-6"
          />
          <p
            className="mt-6 text-blue-600 underline cursor-pointer hover:text-blue-800"
            onClick={() => navigate("/")}
          >
            Go back to shopping
          </p>
        </div>
      ) : (
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-6 bg-white shadow-lg rounded-lg mb-4 transition-transform transform hover:scale-105"
            >
              <div className="flex items-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-700 mb-2">Price: ${item.price}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <p className="text-lg font-medium">{item.quantity}</p>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold mb-2">
                  Total: ${item.price * item.quantity}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-6">
            <p className="text-xl font-semibold mb-2">
              Total Amount: ${totalAmount}
            </p>
            <button
              onClick={handleCheckout}
              className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
