import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/orderConfirmation");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between mb-4 border-b pb-2"
          >
            <p>{item.title}</p>
            <p>
              {item.quantity} x ${item.price} = ${item.price * item.quantity}
            </p>
          </div>
        ))}
        <div className="flex justify-between font-semibold text-xl mt-6">
          <p>Total Amount:</p>
          <p>${totalAmount}</p>
        </div>
        <button
          onClick={handleBuyNow}
          className="mt-8 py-2 px-4 bg-green-600 text-white rounded-lg w-full hover:bg-green-700 transition-all"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
