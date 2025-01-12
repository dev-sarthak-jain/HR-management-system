import { NavLink } from "react-router-dom";

const MenuItem = ({ link, title, isLast, linkClicked }) => (
  <li
  onClick={linkClicked}
    className={`hover:text-purple-500 mx-2 font-nunito sm:text-lg font-semibold ${
      isLast ? "lg:mr-10" : ""
    }`}
  >
    <NavLink to={link}>
      {title} {isLast}
    </NavLink>
  </li>
);

export default MenuItem;
