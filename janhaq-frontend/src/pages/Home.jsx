import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Rights. Your Voice. Your Action.</h1>
          <p className="tagline">
            Find the right laws, schemes, and departments to support your cause.
          </p>
          <div className="land-btn">
            <input
              type="text"
              placeholder="Type your problem..."
              className="hero-search"
            />
            <button className="cta-button">
              Start Now
            </button>
          </div>
        </div>
      </section>

      {/* Features / Quick Access */}
      <section className="features-section">
        <h2>Quick Access</h2>
        <div className="features-grid">
          <Card title="Know Your Rights" icon="📜" />
          <Card title="File a Complaint" icon="📝" />
          <Card title="Explore Schemes" icon="💡" />
        </div>
      </section>

      {/* Highlights */}
      <section className="security-section">
        <h2>Why JanHaq?</h2>
        <div className="security-points">
          <Card title="Awareness" icon="🧠" />
          <Card title="Transparency" icon="🔍" />
          <Card title="Empowerment" icon="💪" />
        </div>
      </section>

      {/* Additional Section: Legal Guidance */}
      <section className="about-section">
        <h2>Legal Guidance</h2>
        <p>
          JanHaq connects you with accurate legal information, government schemes, 
          and departments to guide you through the process of asserting your rights. 
          Our mission is to empower citizens with knowledge and tools to take informed action.
        </p>
      </section>

      {/* Contact / Help Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2>Need Assistance?</h2>
          <p>
            Our team is here to help you understand your rights and connect with 
            the appropriate authorities. Reach out for guidance or report an issue.
          </p>
          <button className="cta-button">Contact Support</button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
