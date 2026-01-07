import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import OrderBlood from "./pages/OrderBlood";
import Donors from "./pages/Donors";
import Stories from "./pages/Stories";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

import ReceiverDashboard from "./pages/dashboards/ReceiverDashboard";
import DonorDashboard from "./pages/dashboards/DonorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/order-blood" element={<OrderBlood />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route element={<ProtectedRoute allowRoles={["receiver"]} />}>
            <Route path="/receiver" element={<ReceiverDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowRoles={["donor"]} />}>
            <Route path="/donor" element={<DonorDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
