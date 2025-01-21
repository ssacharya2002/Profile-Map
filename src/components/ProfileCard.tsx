import { Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
}

interface ProfileCardProps {
  profile: Profile;
  isAdmin?: boolean;
}

export default function ProfileCard({ profile, isAdmin }: ProfileCardProps) {
  const navigate = useNavigate();
  

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profiles/${profile.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }
      navigate(0)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link to={`/profile/${profile.id}`} className="block">
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
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      navigate(`/admin/${profile.id}`);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDelete();
                      navigate("/admin");
                    }}
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
