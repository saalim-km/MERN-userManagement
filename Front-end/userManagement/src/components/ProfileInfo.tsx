import React, { useState } from "react";
import { updateUserProfile, uploadImage } from "../api/userService";
import { update } from "../redux/userSlice";
import { useDispatch } from "react-redux";

interface Iprofile {
  userName: string;
  userEmail: string;
  profileImage?: string;
}

const ProfileInfo: React.FC<Iprofile> = ({
  userName,
  userEmail,
  profileImage,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(userName);
  const [email] = useState(userEmail);
  const [image, setImage] = useState(profileImage);
  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("value vann : ", value);
    const nameRegex = /^[a-zA-Z\s]*$/;

    if (nameRegex.test(value)) {
      setName(value);
      setNameError("");
    } else {
      setNameError("Name can only contain letters and spaces.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
      if (validImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        setImageError("");
      } else {
        setImageError("Only jpg, png, and webp images are allowed.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("handlesubmit function click cheyth");
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "olxProducts");
        data.append("cloud_name", "deh2nuqeb");

        console.log("form submission start aaayi");
        if (image) {
          const imageUrl: string = await uploadImage(data);
          console.log(imageUrl);

          const userData = {
            profileImage: imageUrl,
            name: name,
          };

          console.log("update function vilich");
          const res = await updateUserProfile(userData);
          console.log("update cheyth kittiya response : ", res);
          dispatch(update(res))
        }
      } else {
        const userData = {
          name: name,
        };
        const res = await updateUserProfile(userData);
        console.log("response kitti ", res);
        dispatch(update(res));
      }
      console.log(name, email, image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-50 w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-black text-center">
            Profile Information
          </h2>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-4">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-2 border"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-black">
              <h1 className="text-4xl font-bold">
                {userName.split("")[0].toUpperCase()}
              </h1>
            </div>
          )}
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
          {imageError && (
            <p className="text-red-500 text-sm mt-1">{imageError}</p>
          )}
        </div>

        {/* Name Input */}
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Save Button */}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="cursor-pointer w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
