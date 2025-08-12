import React from "react";

function Button({ label, handleEvent, id }) {
  const handleClick = () => {
    handleEvent(id);
  };
  return (
    <button
      type="button"
      id={id}
      onClick={handleClick}
      className="btn btn-outline-primary rounded-3 my-3 me-3"
    >
      {label}
    </button>
  );
}

export default Button;
