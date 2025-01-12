import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 w-full shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center py-2 px-4">
        {/* Logo/Home */}
        <Link to="/" className="flex items-center">
          <img
            src="./images/dn-logo.png"
            alt="Logo"
            className="w-20 hover:scale-110 transition-transform duration-300"
          />
        </Link>
  
        {/* Navigation */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link
              to="/teams"
              className="text-blue-400 hover:text-orange-500 transition-colors duration-300 font-semibold"
            >
              Teams
            </Link>
          </li>
          <li>
            <Link
              to="/standings"
              className="text-blue-400 hover:text-orange-500 transition-colors duration-300 font-semibold"
            >
              Standings
            </Link>
          </li>
        </ul>
  
        {/* Login Button */}
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 hover:text-orange-500 font-semibold px-6 py-3 rounded transition duration-300"
        >
          LOGIN
        </Link>
      </nav>
    </header>
  );
  
};

export default Header;
