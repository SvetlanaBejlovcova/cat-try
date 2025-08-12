import React, { useState } from "react";

const CatList = (props) => {
  const handleDelete = (cat) => {
    props.onDelete(cat);
  };

  return (
    <li
      key={props.id}
      className="list-group-item list-group-item-warning rounded-3"
    >
      {props.name} - {props.breed}
      <button
        className="btn-delete btn btn-outline-danger btn-sm ms-3 rounded-4"
        title="Delete cat"
        onClick={() => handleDelete(props.cat)}
      >
        X
      </button>
    </li>
  );
};
export default CatList;
