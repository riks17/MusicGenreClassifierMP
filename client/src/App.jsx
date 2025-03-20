import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
