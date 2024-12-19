import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 w-full shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo/Home */}
        <Link to="/" className="flex items-center">
          <img
            src="./images/dn-logo.png"
            alt="Logo"
            className="w-32 hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Navegation */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link
              to="/teams"
              className="text-blue-400 hover:text-orange-500 transition-colors duration-300"
            >
              Teams
            </Link>
          </li>
          <li>
            <Link
              to="/players"
              className="text-blue-400 hover:text-orange-500 transition-colors duration-300"
            >
              Players
            </Link>
          </li>
          <li>
            <Link
              to="/standings"
              className="text-blue-400 hover:text-orange-500 transition-colors duration-300"
            >
              Standings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
