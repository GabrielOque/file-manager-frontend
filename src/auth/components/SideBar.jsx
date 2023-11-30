import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";
import LinkSideBar from "./LinkSideBar";
import { ROLES } from "../../config/config";
import CardFacultySideBar from "./CardFacultySideBar";

const SideBar = () => {
  const navigate = useNavigate();
  const { authenticated, logout, faculties } = useContextProvider();
  const handdlelogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <nav className="w-1/6">
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
            <LinkSideBar route="/home" iconName="fa-house" title="Facultades" />
            <h2 className="text-white ml-5 mt-4 font-bold text-2xl">
              Lista de facultades
            </h2>
            <div className="h-[calc(100vh-320px)] mt-3 mb-3 overflow-auto">
              {faculties.reverse().map((item) => (
                <CardFacultySideBar key={item._id} item={item} />
              ))}
            </div>
          </div>
        )}
        {authenticated?.rol === ROLES.ADMIN && (
          <div className="menu-list">
            <div className="what-rol">
              <span className="rol-label">Rol asignado</span>
              <span className="rol">SuperAdmin</span>
            </div>
            <LinkSideBar route="/home" iconName="fa-house" title="Home" />
            <LinkSideBar
              route="/create-users"
              iconName="fa-user-plus"
              title="Crear usuarios"
            />
            <LinkSideBar
              route="/home"
              iconName="fa-layer-group"
              title="Crear facultades"
            />
          </div>
        )}
        {authenticated?.rol === ROLES.USER && (
          <div className="menu-list">
            <div className="what-rol">
              <span className="rol-label">Rol asignado</span>
              <span className="rol">SuperAdmin</span>
            </div>
            <LinkSideBar route="/home" iconName="fa-house" title="Home" />
            <LinkSideBar
              route="/create-users"
              iconName="fa-user-plus"
              title="Crear usuarios"
            />
            <LinkSideBar
              route="/home"
              iconName="fa-layer-group"
              title="Crear facultades"
            />
          </div>
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
