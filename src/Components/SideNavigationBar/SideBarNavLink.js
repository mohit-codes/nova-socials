import { NavLink } from "react-router-dom";

const SideBarNavLink = ({ children, ariaLabel, role, to }) => {
  return (
    <NavLink
      to={to}
      aria-label={ariaLabel}
      role={role}
      className={({ isActive }) =>
        `flex items-center mt-1 space-x-2 ${
          isActive ? "nav-element-active" : "nav-element"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default SideBarNavLink;
