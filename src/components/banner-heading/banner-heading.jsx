import React from "react";

const Banner = () => {
  return (
    <div className="relative bg-gray-800 text-white py-12 px-10 overflow-hidden shadow-lg" style={{backgroundImage: "url('/images/court-banner.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      {/* Principal Container */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Principal Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          <span className="text-orange-500">Dunk</span><span className="text-blue-400">Nation</span>
          </h1>
          <p className="text-gray-400 mb-6 text-lg">
          Where <span className="text-orange-500 font-bold">basketball</span> meets{" "}
          <span className="text-blue-400 font-bold">data</span>
          </p>

          {/* Buttons */}
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="#"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded transition duration-300"
            >
              REGISTER
            </a>
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition duration-300"
            >
              FANTASY LEAGUE
            </a>
          </div>
        </div>

        {/* Principal Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
          <div className="relative w-60 h-60 md:w-80 md:h-80">
            {/* Stylized Ball and Hoop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-r from-blue-600 to-orange-500 rounded-full"></div>
              <img
                src="/images/dunk-man1.png" // Replace with route
                alt="Basketball Hoop"
                className="absolute w-3/4 h-3/4 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
