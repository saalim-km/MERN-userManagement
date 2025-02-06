import React, { useState, useEffect } from "react";
import { adminLogin } from "../../api/adminService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../redux/adminSlice";
import { IUser } from "../../interface/userInterface";


const AdLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push("Invalid email address");
    }
    if (formData.password.length < 4) {
      newErrors.push("Password must be at least 4 characters");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const adminRes : Partial<IUser> = await adminLogin(formData.email , formData.password);
      console.log("data got from adminlogin api : ",adminRes);
      const payload = {
        name : adminRes.name,
        email : adminRes.email,
        profileImg : adminRes.profileImage
      }
      dispatch(login(payload));
    }
  };

  useEffect(() => {
    setErrors([]);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Login
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

export default AdLogin;