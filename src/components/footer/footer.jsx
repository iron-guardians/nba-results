import React from "react";

function Footer() {
  return (
    <div className="p-2 text-center bg-black mt-4">
      <p className="text-white font-semibold mb-2">
        Where Basketball Meets Data
      </p>
      <p className="text-white">
        <a
          href="https://github.com/iron-guardians"
          target="_blank"
          className="hover:underline"
        >
          IRON GUARDIANS
        </a>{" "}
        ©, 2025 | Developed for IronHack Web Dev Bootcamp
      </p>
    </div>
  );
}

export default Footer;
