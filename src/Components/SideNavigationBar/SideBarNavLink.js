import { NavLink } from "react-router-dom";

const SideBarNavLink = ({ children, ariaLabel, role, to, styleClass }) => {
  return (
    <NavLink
      to={to}
      aria-label={ariaLabel}
      role={role}
      className={({ isActive }) =>
        `${styleClass} flex items-center justify-center lg:justify-start md:mt-3 lg:mt-1 lg:space-x-2 ${
          isActive ? "nav-element-active" : "nav-element"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default SideBarNavLink;
