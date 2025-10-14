import React, { useEffect, useState } from "react";
import '../styles/BackToTop.css';



const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    setLaunching(true);
    const scrollDuration = 1000;
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);
      window.scrollTo(0, start * (1 - progress));
      if (progress < 1) requestAnimationFrame(animateScroll);
      else setLaunching(false);
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <button
      id="backToTopBtn"
      className={`${visible ? "show" : ""} ${launching ? "launching" : ""}`}
      title="Back to top"
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <svg
        className="rocket-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 60"
      >
        <path fill="#667eea" d="M12,45 L8,54 L12,52 Z" />
        <path fill="#667eea" d="M28,45 L32,54 L28,52 Z" />
        <path fill="#5a6bc9" d="M18,45 L20,56 L22,45 Z" />
        <path fill="#4a5ab0" d="M16,52 Q20,54 24,52 L24,48 L16,48 Z" />
        <rect fill="#f5f5f5" x="16" y="20" width="8" height="28" rx="1" />
        <path fill="#764ba2" d="M20,6 L26,20 L14,20 Z" />
        <circle fill="#667eea" cx="20" cy="32" r="2" opacity="0.6" />
      </svg>
      <div className="effects">
        <div className="flames">
          <div className="flame"></div>
          <div className="flame"></div>
          <div className="flame"></div>
        </div>
        <div className="smoke-trail">
          <div className="smoke"></div>
          <div className="smoke"></div>
          <div className="smoke"></div>
          <div className="smoke"></div>
        </div>
      </div>
    </button>
  );
};

export default BackToTop;
