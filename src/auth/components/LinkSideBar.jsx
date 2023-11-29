import { Link } from "react-router-dom";

const LinkSideBar = ({ route, iconName, title }) => {
  return (
    <li>
      <Link to={route} className="btn-sidebar-home">
        <span className="icon">
          <i className={`fa-solid ${iconName}`} />
        </span>
        <span className="text">{title}</span>
      </Link>
    </li>
  );
};

export default LinkSideBar;
