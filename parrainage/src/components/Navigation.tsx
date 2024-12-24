import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, LayoutDashboard } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-xl">Système de Parrainage</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/register"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              <UserPlus className="h-4 w-4" />
              <span>Inscription</span>
            </Link>
            
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Tableau de Bord</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}