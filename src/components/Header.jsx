import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Access cart items from Redux store

  // Calculate the total quantity of items in the cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-red-500 to-purple-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wide">ShoopyGlobe</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-yellow-300 transition duration-300"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-300 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-300 transition duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Cart and Search */}
        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <button className="relative flex items-center justify-center focus:outline-none hover:text-yellow-300 transition duration-300">
              <BsCart3 size={28} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <AiOutlineClose
                  size={30}
                  className="hover:text-yellow-300 transition duration-300"
                />
              ) : (
                <AiOutlineMenu
                  size={30}
                  className="hover:text-yellow-300 transition duration-300"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isOpen && <div className="md:hidden mt-4 px-4"></div>}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-3 bg-purple-700 p-4 rounded-lg shadow-md">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-yellow-300 transition duration-300"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-300 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-300 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
