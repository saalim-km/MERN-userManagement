import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import UserList from "../../components/UserList";
import AdminLogout from "../../components/AdminLogout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/adminSlice";
import { deleteUser, fetchUsers } from "../../api/adminService";
import AddUser from "../../components/AddUser";

interface User {
  _id : string;
  name : string;
  email : string;
  profileImage ?: string
}

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    async function getUsers() {
        const userData = await fetchUsers();
        console.log("users data : ",userData);
        setUsers(userData);
    }
    getUsers();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddUser = ()=> {
    navigate("/add-user")
  }

  const handleEditUser = (user: User) => {
    console.log("Edit user:", user);
    navigate(`/admin-edit/${user._id}`);
  };

  const handleDeleteUser = async (userId: string) => {
    console.log(userId)
    const deleteRes = await deleteUser(userId);
    setUsers(deleteRes);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLogout = ()=> {
    console.log("hoooy")
    dispatch(logout());
    navigate("/admin-login");
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <AddUser handleAddUser={handleAddUser}/>
          <AdminLogout handleLogout={handleLogout}/>
        </div>
          <div className="flex items-center mb-6"> 
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="cursor-pointer absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          <UserList
            users={currentUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
          {filteredUsers.length > usersPerPage && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="cursor-pointer px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                <ChevronLeft />
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="cursor-pointer px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
