import React, { useState } from "react";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);

  const validatePassword = () => {
    const newErrors = [];
    if (newPassword.length < 4) {
      newErrors.push("Password must be at least 4 characters long");
    }
    if (newPassword !== confirmPassword) {
      newErrors.push("Passwords do not match");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword()) {
      console.log("Password updated successfully");
    }
  };

  const checkOldPassword = () => {
    setIsOldPasswordCorrect(oldPassword === "password123");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Card Header */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-black text-center">Change Password</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isOldPasswordCorrect && (
          <div>
            <label className="block text-gray-700 mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={checkOldPassword}
              className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition mt-2"
            >
              Verify Old Password
            </button>
          </div>
        )}

        {isOldPasswordCorrect && (
          <>
            <div>
              <label className="block text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-600 text-white p-3 rounded-md text-sm">
            <ul className="list-disc pl-4">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 rounded-md font-medium transition ${
            isOldPasswordCorrect ? "bg-black text-white hover:bg-gray-900" : "bg-gray-500 text-white cursor-not-allowed"
          }`}
          disabled={!isOldPasswordCorrect}
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Password;