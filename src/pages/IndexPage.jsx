// src/pages/index.jsx
import React from "react";
import Hero from "../components/Index/Hero";
import Features from "../components/Index/Features";
import CTA from "../components/Index/CTA";

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
};

export default IndexPage;
