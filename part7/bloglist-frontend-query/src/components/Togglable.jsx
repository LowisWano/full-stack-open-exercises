import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="m-6">
      <div>
        <button className="btn btn-primary" style={hideWhenVisible} onClick={toggleVisibility}>
          {props.buttonLabelBefore}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div className="flex justify-center m-5">
          <button className="btn btn-error" onClick={toggleVisibility}>{props.buttonLabelAfter}</button>
        </div>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabelAfter: PropTypes.string.isRequired,
  buttonLabelBefore: PropTypes.string.isRequired,
};

export default Togglable;