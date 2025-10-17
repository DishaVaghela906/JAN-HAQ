import { useState } from 'react';

export default function Contact() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="home-container relative min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">

      {/* Gradient background */}
      <div className="gradient-background absolute inset-0 z-0"></div>

      {/* SVG dotted pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots-light"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.1)" />
          </pattern>
          <pattern
            id="dots-dark"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dots-light)"
          className="dark:fill-url(#dots-dark)"
        />
      </svg>

      <div className="flex-grow flex justify-center items-start pt-24 px-4">
        <div className="max-w-3xl w-full bg-white/10 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-lg p-8 md:p-12 flex flex-col space-y-6 z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Contact Us
          </h1>

          {submitted ? (
            <div className="bg-green-100 dark:bg-green-900 p-6 rounded-xl text-green-900 dark:text-green-100 text-center font-medium text-lg">
              Thank you for your message! We will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Optional gradient overlays for extra depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
}
