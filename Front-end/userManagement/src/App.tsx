import { Route, Routes } from "react-router";
import { RootProtect, LoginProtect } from "./protectedComp/ProtectedRoutes";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  const user = useSelector((state) => state.user);
  console.log("data from redux store : ", user);
  return (
    <div>
      <Toaster position='top-right' reverseOrder={false}/>
      <Routes>
        <Route
          path="/"
          element={<RootProtect user={user.user} children={<Home />} />}
        />

        <Route
          path="login"
          element={<LoginProtect user={user.user} children={<Login />} />}
        />
      </Routes>
    </div>
  );
};

export default App;
