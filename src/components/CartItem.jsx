import React from "react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(item.id));
  };

  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600">Price: ${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <button
            onClick={handleDecreaseQuantity}
            className="px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            className="px-2 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
          >
            +
          </button>
        </div>
        <p className="font-semibold">${item.price * item.quantity}</p>
        <button
          onClick={handleRemoveFromCart}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
