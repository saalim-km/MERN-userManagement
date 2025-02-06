import React from "react";

interface IAdminLogout {
  handleLogout : ()=> void;
}

const AdminLogout : React.FC<IAdminLogout> = ({handleLogout}) => {

  return (
      <button
        onClick={handleLogout}
        className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
  );
};

export default AdminLogout;