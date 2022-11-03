import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function createPortalWrapper() {
  const element = document.createElement("div");
  element.id = "portalWrapper";
  return element;
}

const portalWrapperElement = createPortalWrapper();

const Portal = ({
  containerClassName,
  containerStyle,
  contentClassName,
  contentStyle,
  overlay,
  onClose,
  children,
}) => {
  useEffect(() => {
    document.body.appendChild(portalWrapperElement);
  }, []);
  const renderElement = (
    <div style={containerStyle} className={`${containerClassName}`}>
      {overlay && (
        <div
          className="overlay absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}

      <div style={contentStyle} className={`${contentClassName}`}>
        {children}
      </div>
    </div>
  );
  return createPortal(renderElement, portalWrapperElement);
};

Portal.propTypes = {
  // value: PropTypes.string
  containerClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  overlay: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Portal;
