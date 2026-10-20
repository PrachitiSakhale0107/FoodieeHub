import { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import "./App.css";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((item) => item.id === action.food.id);
      if (existing) return state.map((item) => item.id === action.food.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...state, { ...action.food, quantity: 1 }];
    }
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) return state.filter((item) => item.id !== action.id);
      return state.map((item) => item.id === action.id ? { ...item, quantity: action.quantity } : item);
    case "REMOVE": return state.filter((item) => item.id !== action.id);
    case "CLEAR": return [];
    default: return state;
  }
}
function getSavedCart() {
  try { const saved = localStorage.getItem("foodiehub-cart"); return saved ? JSON.parse(saved) : []; }
  catch { return []; }
}
function getSavedOrders() {
  try { return JSON.parse(localStorage.getItem("foodiehub-orders") || "[]"); }
  catch { return []; }
}
function AppContent() {
  const navigate = useNavigate();
  const [cart, dispatch] = useReducer(cartReducer, undefined, getSavedCart);
  const [orders, setOrders] = useState(getSavedOrders);
  useEffect(() => { localStorage.setItem("foodiehub-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("foodiehub-orders", JSON.stringify(orders)); }, [orders]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const addToCart = (food) => dispatch({ type: "ADD", food });
  const updateQuantity = (id, quantity) => dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  const removeItem = (id) => dispatch({ type: "REMOVE", id });
  const checkout = (total) => {
    if (!cart.length) return;
    const order = { id: Date.now().toString().slice(-8), date: new Date().toLocaleString(), items: cart.map((item) => ({ ...item })), total };
    setOrders((previousOrders) => [...previousOrders, order]);
    dispatch({ type: "CLEAR" });
    navigate("/orders");
  };
  return <><Navbar cartCount={cartCount} /><Routes>
    <Route path="/" element={<Home cart={cart} addToCart={addToCart} />} />
    <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={checkout} />} />
    <Route path="/orders" element={<Orders orders={orders} />} />
    <Route path="*" element={<main className="page-container empty-state"><h2>Page not found</h2><button className="primary-button" onClick={() => navigate("/")}>Go Home</button></main>} />
  </Routes><footer className="footer"><p>🍴 FoodieHub — Made with React.js</p><span>Fresh food. Happy moments.</span></footer></>;
}
export default function App() { return <BrowserRouter><AppContent /></BrowserRouter>; }
