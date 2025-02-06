import React from "react";

interface IAddUser {
  handleAddUser: () => void;
}

const AddUser: React.FC<IAddUser> = ({ handleAddUser }) => {
  return (
    <button
      onClick={handleAddUser}
      className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
    >
      Add User
    </button>
  );
};

export default AddUser;