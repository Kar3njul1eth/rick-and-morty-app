import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Rick & Morty
        </Link>
        <div>
          <Link to="/" className="text-white mr-4">Characters</Link>
          <Link to="/episodes" className="text-white mr-4">Episodes</Link>
          <Link to="/location" className="text-white">Locations</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;