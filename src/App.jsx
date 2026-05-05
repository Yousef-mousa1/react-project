import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Master from './component/master/master.jsx';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import Register from './pages/regsiter/register.jsx';
import About from './pages/aboutus/aboutus.jsx';
import Error from './pages/error/error.jsx';
import Product from './pages/products/ product.jsx';
import Cart from './pages/cart/cart.jsx';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  function saveUserData() {
    const encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        setUserData(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('userToken');
      }
    }
  }

  // هذه هي الدالة التي قمنا بتعديلها
  function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('shoppingCart'); // <-- مسح السلة من التخزين
    setUserData(null);
    setCart([]); // <-- تفريغ السلة من الحالة
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData();
    }
  }, []);

  function addToCart(product) {
    if (!userData) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.title} has been added to your cart!`);
  }

  function removeFromCart(productId) {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  }

  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
    }
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Master userData={userData} logout={logout} cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: 'product', element: <Product addToCart={addToCart} /> },
        { path: 'cart', element: <Cart cartItems={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /> },
        { path: 'about', element: <About /> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
}
