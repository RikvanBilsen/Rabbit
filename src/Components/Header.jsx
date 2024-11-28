// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, User, Menu } from 'lucide-react';

const Header = () => {
  return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-500">Rabbit</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search.."
                    className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                  to="/create-post"
                  className="hidden md:flex items-center space-x-1 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create Post</span>
              </Link>

              <Link
                  to="/create-account"
                  className="p-2 hover:bg-gray-100 rounded-full">
                <User className="h-6 w-6 text-gray-600" />
              </Link>

              <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;