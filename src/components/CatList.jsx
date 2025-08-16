import React, { useState } from "react";
import "./CatList.css";
import catPawRed from "../pics/catPawRed.png";
import catPawRedHover from "../pics/catPawRedHover.png";

const CatList = (props) => {
  const [mouseOver, setMouseOver] = useState(false);

  const handleDelete = (cat) => {
    props.onDelete(cat);
  };

  return (
    <li key={props.id} className="cat-list list-group-item rounded-3">
      {props.name} - {props.breed}
      <input
        type="image"
        src={mouseOver ? catPawRedHover : catPawRed}
        width={30}
        height={30}
        className="cat-paw-delete align-middle ms-3"
        title="Smaž kočku"
        onClick={() => handleDelete(props.cat)}
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
      />
    </li>
  );
};
export default CatList;
