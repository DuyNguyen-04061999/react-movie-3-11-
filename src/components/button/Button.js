import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const Button = ({
  onClick,
  children,
  type,
  bgColor = "primary",
  className,
}) => {
  const [bgClassName, setBgClassName] = useState("bg-primary");

  useEffect(() => {
    switch (bgColor) {
      case "primary": {
        setBgClassName("bg-primary");
        break;
      }
      case "secondary": {
        setBgClassName("bg-secondary");
        break;
      }

      default: {
        setBgClassName("bg-primary");
        break;
      }
    }
  }, [bgColor]);

  return (
    <button
      type={type}
      className={`rounded-lg py-3 px-6 font-medium text-white ${bgClassName} capitalize ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  type: PropTypes.string,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
