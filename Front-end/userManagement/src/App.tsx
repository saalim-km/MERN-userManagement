import { Route, Routes } from "react-router";
import { RootProtect, LoginProtect } from "./protectedComp/ProtectedRoutes";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { RootState } from "./redux/store";
import Profile from "./pages/Profile";

const App = () => {
  const user = useSelector((state : RootState) => state.user.isAuthenticated);
  console.log("data from redux store : ", user);
  return (
    <div>
      <Toaster position='top-right' reverseOrder={false}/>
      <Routes>
        <Route
          path="/"
          element={<RootProtect user={user} children={<Home />} />}
        />

        <Route
          path="login"
          element={<LoginProtect user={user} children={<Login />} />}
        />

        <Route
          path="profile"
          element = {<RootProtect user={user} children = {<Profile/>}/>}
        />
      </Routes>
    </div>
  );
};

export default App;
