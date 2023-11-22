import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";
import { ROLES } from "../../config/config";

const SideBar = () => {
  const navigate = useNavigate();
  const { authenticated, logout } = useContextProvider();
  const handdlelogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="bg-blue-800 w-1/6 h-screen">
      <div className="w-full">
        <h1 className="font-bold text-6xl">SIDEBAR</h1>
        <nav>
          {authenticated?.rol === ROLES.SUPER_ADMIN && (
            <ul>
              <li>
                <Link to="/create-users">Crear usuarios</Link>
              </li>
              <li>
                <Link to="/home">HOME</Link>
              </li>
              <li>SUPER ADMIN</li>
              <li>SUPER ADMIN</li>
              <li>SUPER ADMIN</li>
            </ul>
          )}
          {authenticated?.rol === ROLES.ADMIN && (
            <ul>
              <li>ADMIN</li>
              <li>ADMIN</li>
              <li>ADMIN</li>
              <li>ARMIN</li>
            </ul>
          )}
          {authenticated?.rol === ROLES.USER && (
            <ul>
              <li>USER</li>
              <li>USER</li>
              <li>USER</li>
              <li>USER</li>
            </ul>
          )}
          <button onClick={handdlelogout} className="bg-red-500">
            Cerrar sesion
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
