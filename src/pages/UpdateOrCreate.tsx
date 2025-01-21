import { useParams, useNavigate } from "react-router-dom";
import { Profile } from "../types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

function UpdateOrCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Profile>();

  const initialValues = {
    id: "",
    name: "",
    photo: "",
    description: "",
    address: "",
    latitude: 0,
    longitude: 0,
    phone: "",
    email: "",
    interests: [],
  };

  const [profile, setProfile] = useState<Profile>(initialValues);

  const title = profile.id ? "Edit Profile" : "Create Profile";
  const actionText = profile.id ? "Save changes" : "Create profile";

  useEffect(() => {
    async function fetchProfile() {
      if (id) {
        setIsLoading(true);
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/profiles/${id}`
          );
          if (!res.ok) {
            throw new Error(
              `Failed to fetch profile with status: ${res.status}`
            );
          }
          const data: Profile = await res.json();
          setProfile(data);
          reset(data);
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "An error occurred"
          );
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchProfile();
  }, [id, reset]);

  const onSubmit = async (data: Profile) => {
    setError(null);
    try {
      // Convert interests from string to array if needed
      if (typeof data.interests === "string") {
        data.interests = (data.interests as string).split(",").map((i) => i.trim());
      }

      const url = profile.id
        ? `${import.meta.env.VITE_API_URL}/api/profiles/${id}`
        : `${import.meta.env.VITE_API_URL}/api/profiles`;

        console.log("url",url);
        console.log("data",data);

      const res = await fetch(url, {
        method: profile.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const profileId =( await res.json()).id;

      if (!res.ok) {
        throw new Error(`Failed to ${id ? "update" : "create"} profile`);
      }

      navigate(`/profile/${profileId}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("name", {
                  required: "Name is required",
                  minLength: 3,
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photo"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("photo", { required: "Photo URL is required" })}
              />
              {errors.photo && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Latitude
                </label>
                <input
                  type="number"
                  id="latitude"
                  step="any"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("latitude", {
                    required: "Latitude is required",
                  })}
                />
                {errors.latitude && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.latitude.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Longitude
                </label>
                <input
                  type="number"
                  id="longitude"
                  step="any"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("longitude", {
                    required: "Longitude is required",
                  })}
                />
                {errors.longitude && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.longitude.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                />
                {errors?.phone && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors?.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="interests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Interests (comma-separated)
              </label>
              <input
                type="text"
                id="interests"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("interests", {
                  required: "Interests are required",
                })}
              />
              {errors.interests && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.interests.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/profiles")}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : actionText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateOrCreate;
