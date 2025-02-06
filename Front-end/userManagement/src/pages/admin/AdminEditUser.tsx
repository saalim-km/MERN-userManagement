import React, { useState, useEffect } from "react";
import { uploadImage, userRegister } from "../../api/userService";
import { useNavigate, useParams } from "react-router";
import { handleError } from "../../utils/errorHandler";
import { editUser, fetchUser } from "../../api/adminService";
import { IUser } from "../../interface/userInterface";

const AdminEditUser = () => {
  const navigate = useNavigate();
  const {userId} = useParams();

  const [errors, setErrors] = useState<string[]>([]);
  const [imageError , setImageError] = useState<string>("");
  const [user,setUser] = useState({});

  useEffect(()=> {
    console.log(userId)
    if(!userId){
        console.log("user id is not provided !!")
        return;
    }

    async function getUserData(userId:string) {
        const userData = await fetchUser(userId);
        console.log("got user data : ",userData);
        setUser(userData);
    }
    getUserData(userId)
},[])

  const validateForm = () => {
    const newErrors: string[] = [];

    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!nameRegex.test(user.name)) {
      newErrors.push("Name must be at least 2 characters and contain only letters and spaces");
    }

    if(!user.profileImage) {//
      newErrors.push("upload image to add user");
    }

    if(imageError) {
      newErrors.push("reslove image error to add user");  
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum|co|in)$/;
    if (!emailRegex.test(user.email)) {
      newErrors.push("Invalid email address. Must end with .com, .net, .in, etc.");
    }


    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
      if(validImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUser((prevData)=> ({
            ...prevData,
            profileImage : reader.result as string
          }))
        };
        reader.readAsDataURL(file);
        console.log(user.profileImage)
        setImageError("")
      }else{
        setImageError("Only jpg, png, and webp images are allowed");
        setUser((prevData)=> ({
          ...prevData,
          profileImage : ""
        }))
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submission start:", user);
      try {
          const data = new FormData();
          data.append("file", user.profileImage);
          data.append("upload_preset", "olxProducts");
          data.append("cloud_name", "deh2nuqeb");

          const imageUrl = await uploadImage(data);
          console.log("got image url",imageUrl);
          
          const { confirmPassword , password ,_id , email , createdAt , updatedAt , __v , isAdmin ,   ...userData } = user;
            console.log(userData)
          userData.profileImage = imageUrl;
          console.log(userData);

          console.log(`Confirm password removed: ${confirmPassword}`);
          const editedUser = await editUser(userData , userId);
          console.log(editedUser)
          navigate("/admin")
      } catch (error) {
        handleError(error);
      }
    }
  };

  useEffect(() => {
    setErrors([]);
  }, []);

  const handleDashboardClick = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-2 border"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-black">
                <h1 className="text-4xl font-bold">N/A</h1>
              </div>
            )}
            {imageError ? <h1 className="text-red-500">{imageError}</h1> : ""}
            <label
              htmlFor="image-upload"
              className="text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Upload new image
              <input
                id="image-upload"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/jpeg, image/png, image/webp"
              />
            </label>
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              readOnly
              id="email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Edit User
          </button>
          <button
            type="button"
            onClick={handleDashboardClick}
            className="cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
          >
            Cancel
          </button>
        </form>
        {errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded transition-all duration-300 ease-in-out">
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEditUser;