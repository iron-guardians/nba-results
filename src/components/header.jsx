import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white text-black flex items-center fixed top-0 left-0 w-full shadow-md z-50">
      <nav className="flex justify-between items-center">
        <Link to="/"><img src="./images/dn-logo.png" alt="Logo" className="w-32" /></Link>
      </nav>
    </header>
  );
};

export default Header;