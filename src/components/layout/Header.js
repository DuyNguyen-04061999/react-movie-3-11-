import React from "react";
import { NavLink } from "react-router-dom";

const listNav = [
  {
    id: 1,
    to: "/",
    exact: true,
    nav: "Home",
  },
  {
    id: 2,
    to: "/movies",
    exact: true,
    nav: "Movies",
  },
];

const Header = () => {
  return (
    <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
      {listNav?.map((item) => {
        const { id, to, exact, nav } = item;
        return (
          <NavLink
            key={id}
            to={to}
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-white"
            }
            exact={`${exact}`}
            end
          >
            {nav}
          </NavLink>
        );
      })}
      
    </header>
  );
};

export default Header;
