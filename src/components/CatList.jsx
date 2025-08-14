import React, { useState } from "react";
import "./CatList.css";
import pawDelete from "../pics/catPawDelete.png";

const CatList = (props) => {
  const handleDelete = (cat) => {
    props.onDelete(cat);
  };

  return (
    <li key={props.id} className="cat-list list-group-item rounded-3">
      {props.name} - {props.breed}
      <button
        className="btn-delete btn btn-outline-light btn-sm ms-3 rounded-3"
        title="Smaž kočku"
        onClick={() => handleDelete(props.cat)}
      >
        <img src={pawDelete} width={27} height={27} />
      </button>
    </li>
  );
};
export default CatList;
