import { Routes, Route } from "react-router-dom";
import Login from "./public/pages/Login";
import Home from "./auth/pages/Home";
import ProtectedRoutes from "./auth/components/ProtectedRoutes";
import { useContextProvider } from "./context/ContextProvider";
import CreateUsers from "./auth/pages/CreateUsers";
import SideBar from "./auth/components/SideBar";
import UsersPage from "./auth/pages/UsersPage";

const App = () => {
  const { authenticated } = useContextProvider();
  const isAuth = authenticated && authenticated.name;
  return (
    <div className="w-full flex">
      {isAuth && <SideBar />}
      <div className={`${isAuth ? "w-5/6" : "w-full"}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create-users" element={<CreateUsers />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
