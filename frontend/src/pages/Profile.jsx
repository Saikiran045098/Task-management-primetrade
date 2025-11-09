import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) throw new Error("User not authenticated");

        const res = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUser(data); 
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        User not found
      </div>
    );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full flex flex-col items-center">
        {/* Circular Avatar */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          {user.name[0]?.toUpperCase()}
        </div>

        {/* My Profile Text */}
        <p className="text-gray-700 font-semibold text-lg sm:text-xl md:text-2xl mb-4">
          My Profile
        </p>

        {/* User Details */}
        <div className="w-full space-y-3 text-sm sm:text-base md:text-lg">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Name:</span>
            <span className="text-gray-800 font-semibold">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Email:</span>
            <span className="text-gray-800 font-semibold">{user.email}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
