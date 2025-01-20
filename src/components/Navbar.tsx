import { UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center px-4 text-gray-700 hover:text-blue-600"
            >
              <Users className="mr-2" />
              Profiles
            </Link>
            <Link
              to="/admin"
              className="flex items-center px-4 text-gray-900 hover:text-blue-600"
            >
              <UserPlus className="mr-2" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
