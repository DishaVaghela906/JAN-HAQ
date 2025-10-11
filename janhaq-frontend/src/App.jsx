import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Laws from "./pages/Laws";
import Schemes from "./pages/Schemes";
import ProblemSolver from "./pages/ProblemSolver";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Departments from "./pages/Departments";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="laws" element={<Laws />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="problem-solver" element={<ProblemSolver />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="departments" element={<Departments />} />
        </Route>

        {/* Auth pages (no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* Add other protected pages here */}
          </Route>
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<div className="p-10 text-center">Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
