import { Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
}

interface ProfileCardProps {
  profile: Profile;
  onEdit?: (profile: Profile) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function ProfileCard({ 
  profile, 
  onEdit, 
  onDelete, 
  isAdmin 
}: ProfileCardProps) {
  return (
    <Link 
      to={`/profile/${profile.id}`}
      className="block"
    >
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              {isAdmin && (
                <div 
                  className="flex gap-2"
                  onClick={(e) => e.preventDefault()} // Prevent navigation when clicking admin buttons
                >
                  <button
                    onClick={() => onEdit?.(profile)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete?.(profile.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-600 mt-1">{profile.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
