import React from 'react';
import { useNavigate } from 'react-router';

const BreadCrumb = () => {
    const navigate = useNavigate();
  return (
    <div className="absolute top-25 left-5 flex items-center text-sm bg-gray-100 text-black px-4 py-2 rounded shadow-sm">
      <span onClick={()=> navigate("/profile")} className="cursor-pointer hover:text-gray-700">Profile Info</span>
      <span className="mx-2">/</span>
      <span onClick={()=> navigate("/password")} className="cursor-pointer hover:text-gray-700">Change Password</span>
    </div>
  );
};

export default BreadCrumb;