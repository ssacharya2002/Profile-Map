import { Plus, UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          <div className="flex w-full items-center justify-between">
            <div className="flex space-x-2">
              <Link
                to="/"
                className="flex items-center rounded-lg px-4 text-gray-600 transition-all hover:bg-gray-50 hover:text-blue-600"
              >
                <Users className="mr-2 h-5 w-5" />
                <span className="font-medium">Profiles</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center rounded-lg px-4 text-gray-600 transition-all hover:bg-gray-50 hover:text-blue-600"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                <span className="font-medium">Admin</span>
              </Link>
            </div>
            <Link
              to="/admin/new"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;