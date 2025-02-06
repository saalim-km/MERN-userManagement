import React from "react";

interface HeroProps {
  username: string;
  email: string;
  profileImage ?: string;
}

const Hero: React.FC<HeroProps> = ({ username, email , profileImage }) => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <div className="text-center bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-600">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-600"
        />
        <h1 className="text-4xl font-extrabold text-gray-100 mb-3">
          Welcome, <span className="text-blue-400">{username}</span>! 👋
        </h1>
        <p className="text-lg font-semibold text-gray-300">
          Your email: <span className="text-green-400">{email}</span>
        </p>
        <p className="mt-4 text-gray-400 italic">Glad to have you here! 🚀</p>
      </div>
    </section>
  );
};

export default Hero;