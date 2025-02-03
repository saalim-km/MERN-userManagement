import { useState, useEffect } from "react";
import { userLogin, userRegister } from "../api/userService";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { showErrorToast, showSuccessToast } from "../utils/customToast";

const Login = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!isLogin && formData.name.length < 2) {
      newErrors.push("Name must be at least 2 characters");
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push("Invalid email address");
    }
    if (formData.password.length < 8) {
      newErrors.push("Password must be at least 8 characters");
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.push("Passwords don't match");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submission start aaayiiii:", formData);
      async function submitForm() {
        try {
          if (isLogin) {
            const loginRes = await userLogin(formData);
            console.log("data received", loginRes);

            if (loginRes) {
              if (loginRes.success) {
                showSuccessToast(loginRes.message || "Login success");
                const { user } = loginRes;
                const userCredentials = {
                  userName: user.name,
                  email: user.email,
                  profileImg: user.profileImage,
                };
                dispatch(login(userCredentials));
              } else {
                showErrorToast(loginRes.message);
              }
            }
          }else {
            const {confirmPassword , ...userData} = formData;
            const signupRes = await userRegister(userData);
            if(signupRes){
                console.log("account created for user  : ",signupRes)
            }
          }
        } catch (error: any) {
          console.log(error);
          showErrorToast(error.message);
        }
      }
      submitForm();
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors([]);
  };

  useEffect(() => {
    setErrors([]);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
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
                value={formData.name}
                onChange={handleChange}
                className="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          )}
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
          {!isLogin && (
            <div className="transition-all duration-300 ease-in-out">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={toggleMode}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
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

export default Login;
