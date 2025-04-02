import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CoursesPage from "./CoursesPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { AuthProvider, useAuth } from "./components/AuthProvider";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<PrivateRoute element={<CoursesPage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
