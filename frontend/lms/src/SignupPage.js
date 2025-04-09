import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegForm from "./components/RegForm";

const SignupPage = () => {
  return (
    <div className="sign-up-page">
      <Header />
      <RegForm />
      <Footer />
    </div>
  );
};

export default SignupPage;
