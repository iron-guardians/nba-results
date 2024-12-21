import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
      
        {/* Slogan */}
        <p className="text-blue-400 font-semibold text-lg mb-2 transition-colors duration-300">
          Where Basketball Meets Data
        </p>

        {/* Link and Credits */}
        <p className="text-gray-400 text-sm">
          <a
            href="https://github.com/iron-guardians"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-orange-500 transition-colors duration-300"
          >
            IRON GUARDIANS
          </a>{" "}
          ©, 2025 | Developed for IronHack Web Dev Bootcamp
        </p>
      </div>
    </footer>
  );
}

export default Footer;

