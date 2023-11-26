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
        <li className="li-logo">
          <Link to="/home" className="btn-sidebar-home-logo">
            <span className="text-logo">SwiftAdmin</span>
          </Link>
        </li>

        {authenticated?.rol === ROLES.SUPER_ADMIN && (
          <div className="menu-list">
            <div className="what-rol">
              <span className="rol-label">Rol asignado</span>
              <span className="rol">SuperAdmin</span>
            </div>
            <li>
              <Link to="/create-users" className="btn-sidebar-home">
                <span className="icon">
                  <i className="fa-solid fa-user-plus" />
                </span>
                <span className="text">Crear usuarios</span>
              </Link>
            </li>
            <li>
              <Link to="/home" className="btn-sidebar-home">
                <span className="icon">
                  <i className="fa-solid fa-house" />
                </span>
                <span className="text">Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/home" className="btn-sidebar-home">
                <span className="icon">
                  <i className="fa-solid fa-layer-group" />
                </span>
                <span className="text">Facultades</span>
              </Link>
            </li>
            <li>
              <Link to="/home" className="btn-sidebar-home">
                <span className="icon">
                  <i className="fa-solid fa-layer-group" />
                </span>
                <span className="text">Facultades</span>
              </Link>
            </li>
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
        <div className="menu-list">
          <li>
            <Link onClick={handdlelogout} className="btn-sidebar-home">
              <span className="icon">
                <i className="fa-solid fa-right-from-bracket" />
              </span>
              <span className="text">Cerrar Sesión</span>
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
