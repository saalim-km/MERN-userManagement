import { Route, Routes } from "react-router";
import { RootProtect, LoginProtect, AdminLogin, AdminProtectRoute } from "./protectedComp/ProtectedRoutes";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Home from "./pages/user/Home";
import { Toaster } from "react-hot-toast";
import { RootState } from "./redux/store";
import Profile from "./pages/user/Profile";
import AdLogin from "./pages/admin/AdLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddUserPage from "./pages/admin/AddUserPage";
import AdminEditUser from "./pages/admin/AdminEditUser";

const App = () => {
  const admin = useSelector((state : RootState)=> state.admin.isAuthenticated);
  const user = useSelector((state : RootState) => state.user.isAuthenticated);
  console.log("data from redux store User state isAuthenticated: ", user);
  console.log("data from redux store Admin state isAuthenticated: ", admin);
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

        <Route
          path="admin-login"
          element = {<AdminLogin  admin={admin} children={<AdLogin/>}/>}
        />

        <Route path="admin" element = {
          <AdminProtectRoute admin={admin} children={<AdminDashboard/>}/>
        }/>

        <Route path="add-user" element = {
          <AdminProtectRoute admin={admin} children={<AddUserPage/>}/>
        }/>

        <Route path="admin-edit/:userId" element = {
          <AdminProtectRoute admin={admin} children = {<AdminEditUser/>}/>
        }/>
      </Routes>

    </div>
  );
};

export default App;
