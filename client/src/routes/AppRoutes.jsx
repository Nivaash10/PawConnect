import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Marketplace from "../pages/Marketplace/Marketplace";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import AIAssistant from "../pages/AIAssistant/AIAssistant";
import PetMatching from "../pages/AIPetMatching/PetMatching";
import PetDetails from "../pages/PetDetails/PetDetails";
import Favorites from "../pages/Favorites/Favorites";
import MyListings from "../pages/MyListings/MyListings";
import ListPet from "../pages/ListPet/ListPet";
import Dashboard from "../pages/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import ComingSoonPage from "../components/ComingSoonPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public routes ──────────────────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="/ai" element={<AIAssistant />} />
        <Route path="/pet-matching" element={<PetMatching />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Protected routes ───────────────────────────────────────── */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-listings"
          element={
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-pet"
          element={
            <ProtectedRoute>
              <ListPet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ComingSoonPage
                title="My Profile"
                description="Manage your account details, preferences, and notification settings."
                icon="👤"
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ComingSoonPage
              title="Page Under Construction"
              description="This page is currently being prepared. Check back soon for updates!"
              icon="🐾"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;