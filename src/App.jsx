import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Item from "./pages/Item/Item";
import Cart from "./pages/Cart/Cart";
import { useEffect } from "react";
import alertify from "alertifyjs";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Bill from "./pages/Bill/Bill";
import Customer from "./pages/Customer/Customer";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  useEffect(() => {
    alertify.set("notifier", "position", "top-center");
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/items" element={<ProtectedRoute><Item /></ProtectedRoute>} />
          <Route path="/bills" element={<ProtectedRoute><Bill /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><Navigate to="/home" /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

function ProtectedRoute ({ children }) {
  if(localStorage.getItem('pos-user')) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}