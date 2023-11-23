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
    <nav>
      <div className="sidebar">
        <div className="logo">
          <img src="/src/assets/default.png" alt="Logo de swiftAdmin" />
          <span>SwiftAdmin</span>
        </div>

        {authenticated?.rol === ROLES.SUPER_ADMIN && (
          <div className="menu-list">
            <h2 className="rol">SuperAdmin</h2>
            <a>
              <Link to="/create-users">
                <i className="fa-solid fa-user-plus" />
                Crear usuarios
              </Link>
            </a>
            <a>
              <Link to="/home">
                <i className="fa-solid fa-house" />
                HOME
              </Link>
            </a>
            <a>
              <Link to="/">
                <i className="fa-solid fa-layer-group" />
                Facultades
              </Link>
            </a>
            <a>
              <Link to="/">
                <i className="fa-solid fa-layer-group" />
                Facultades
              </Link>
            </a>
          </div>
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
        <a onClick={handdlelogout}>
          <i className="fa-solid fa-right-from-bracket" />
          Salir
        </a>
      </div>
    </nav>
  );
};

export default SideBar;
