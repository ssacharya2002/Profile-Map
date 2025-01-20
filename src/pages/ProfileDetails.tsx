import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, Loader2, MapPin } from 'lucide-react';
import type { Profile } from '../types';
import { MapComponent } from '../components/MapComponent';

export default function ProfileDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profiles/${id}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
        setLoading(false);
        console.log("profile",profile);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <h1 className="text-3xl font-bold mt-4">{profile.name}</h1>
            <p className="text-gray-600 mt-2">{profile.description}</p>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-500" />
                <span>{profile.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-gray-500" />
                <a href={`mailto:${profile.contact.email}`} className="text-blue-500 hover:underline">
                  {profile.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-gray-500" />
                <a href={`tel:${profile.contact.phone}`} className="text-blue-500 hover:underline">
                  {profile.contact.phone}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <MapComponent profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}