import React, { useState } from "react";

function CatForm({ data, onAdd }) {
  const [newCat, setNewCat] = useState({
    id: data.length > 0 ? Math.max(...data.map((cat) => cat.id)) + 1 : 1,
    name: "",
    breed: "",
  });
  const [valid, setValid] = useState(false);

  const validateData = (cat) => {
    if (cat.name.trim() === "" || cat.breed.trim() === "") {
      setValid(false);
    } else {
      setValid(true);
    }
  };
  const resetNewCat = () => {
    const temp = { id: newCat.id + 1, name: "", breed: "" };
    setNewCat(temp);
    setValid(false);
  };

  const handleChange = (event) => {
    const source = event.target.name;
    const val = event.target.value;
    let updatedCat;
    switch (source) {
      case "name": {
        updatedCat = { ...newCat, name: val };
        break;
      }
      case "breed": {
        updatedCat = { ...newCat, breed: val };
        break;
      }
      default:
        break;
    }
    setNewCat(updatedCat);
    validateData(updatedCat);
  };

  return (
    <div className="cat-form mt-3">
      <div className="row d-flex align-items-center">
        <div className="col-auto">
          <input
            className="rounded-3"
            type="text"
            name="name"
            id="name"
            placeholder="jméno"
            value={newCat.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <input
            className="rounded-3"
            type="text"
            name="breed"
            id="breed"
            placeholder="rasa kočky"
            value={newCat.breed}
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <button
            className="btn btn-outline-success rounded-3"
            disabled={!valid}
            onClick={() => {
              onAdd(newCat);
              resetNewCat();
            }}
          >
            Přidej
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatForm;
