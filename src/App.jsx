import { useState, useEffect } from "react";
import "./App.css";
import rawData from "./catsData.json";
import CatList from "./components/CatList";
import CatForm from "./components/CatForm";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import Clock from "./components/Clock";
import TextArea from "./components/TextArea";
import ProgressBar from "./components/ProgressBar";
import validatePositiveInt from "./functions/validatePositiveInt";
import Button from "./components/Button";
import wellness from "./pics/wellness.jpg";
import Image from "./components/Image";
import saveText from "./functions/saveText";

function App() {
  const [listOfCats, setListOfCats] = useState(rawData.cats);
  const [activeTab, setActiveTab] = useState(1);
  const [salon, setSalon] = useState("Ostrava");
  const [sluzby, setSluzby] = useState(["masáž"]);
  const [text, setText] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [initialCountDown, setInitialCountDown] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let temp = prompt("Zadejte kolik mléka máme vypít (v ml):", 10);
    while (!validatePositiveInt(temp)) {
      temp = prompt("Zadejte kolik mléka máme vypít (v ml):", 10);
    }
    setInitialCountDown(parseInt(temp));
    setCountDown(parseInt(temp));
  }, []);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countDown]);

  const progress =
    countDown === initialCountDown ? 100 : (countDown / initialCountDown) * 100;

  const handleDeleteCat = (catToRemove) => {
    setListOfCats(listOfCats.filter((cat) => cat !== catToRemove));
  };

  const handleAdd = (catToAdd) => {
    setListOfCats([...listOfCats, catToAdd]);
  };

  const handleData = (data, source) => {
    switch (source) {
      case "rbg-vyber-salonu": {
        setSalon(data);
        break;
      }
      case "chb-sluzba": {
        setSluzby(data);
        if (data.includes("jiná služba")) {
          setIsHidden(false);
        } else {
          setIsHidden(true);
          setText("");
        }
        break;
      }
      case "txa-sluzba": {
        setText(data);
        break;
      }
      default:
        break;
    }
  };
  const handleEvent = (source) => {
    switch (source) {
      case "btn-show": {
        setShow(true);
        break;
      }
      case "btn-hide": {
        setShow(false);
        break;
      }
      case "btn-download": {
        const order = `Objednali jste si: ${sluzby.map(
          (sluzba) => " " + sluzba
        )} ${text} - salón ${salon}.\nDatum objednávky: ${new Date().toLocaleString(
          "cs-CZ"
        )}`;
        saveText(order);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h1 className="text-center font-face-dancing fw-bold text-primary-emphasis m-3">
        Cat try
      </h1>
      <div>
        <ProgressBar id="pgb-progress" dataIn={progress} />
        <p>
          Vyčkejte, prosím, právě pijeme {initialCountDown} ml mléka. Už jsme
          vypily {`${initialCountDown - countDown}`} ml.
        </p>
      </div>
      <div className="page-toggler d-flex align-items-center my-3">
        <button
          className={`toggler-btn btn btn-outline-primary rounded-3 me-3 ${
            activeTab === 1 ? "active" : ""
          }`}
          name="list-of-cats"
          onClick={() => {
            setActiveTab(1);
          }}
        >
          Seznam kočičích zákazníků
        </button>
        <button
          className={`toggler-btn btn btn-outline-primary rounded-3 ms-3 ${
            activeTab === 2 ? "active" : ""
          }`}
          name="cat-services"
          onClick={() => {
            setActiveTab(2);
          }}
        >
          Služby pro kočku
        </button>
      </div>
      {activeTab === 1 && (
        <>
          <ul
            style={{ listStyleType: "none" }}
            className="list-group list-group-flush"
          >
            {listOfCats.map((cat) => (
              <CatList
                id={cat.id}
                name={cat.name}
                breed={cat.breed}
                cat={cat}
                onDelete={handleDeleteCat}
              />
            ))}
          </ul>
          <CatForm data={listOfCats} onAdd={handleAdd} />
        </>
      )}
      {activeTab === 2 && (
        <>
          <RbGroup
            label="Vyberte salón:"
            id="rbg-vyber-salonu"
            dataIn={[
              { label: "Ostrava", value: "Ostrava" },
              { label: "Olomouc", value: "Olomouc" },
              { label: "Brno", value: "Brno" },
            ]}
            selectedValue={salon}
            handleData={handleData}
          />
          <ChbGroup
            label="Vyberte službu:"
            id="chb-sluzba"
            dataIn={[
              { label: "mytí", value: "mytí" },
              { label: "stříhání", value: "stříhání" },
              {
                label: "česání",
                value: "česání",
              },
              { label: "masáž", value: "masáž" },
              { label: "stříhání drápků", value: "stříhání drápků" },
              { label: "jiná služba", value: "jiná služba" },
            ]}
            selectedValue={sluzby}
            handleData={handleData}
          />
          <div className={`${isHidden ? "hidden" : ""}`}>
            <TextArea
              label="Popište, jakou jinou službu by jste si přáli:"
              id="txa-sluzba"
              height={150}
              dataIn={text}
              handleData={handleData}
            />
          </div>

          <p>
            <span className="fw-bold">Objednávka služby</span> -{" "}
            <span className="fst-italic">salón {salon}:</span>
            {" * "}
            {sluzby.map((sluzba) => sluzba + " * ")}
          </p>
          <p className={`${isHidden ? "hidden" : ""}`}>
            Vaše další přání: {text}
          </p>
          <div className="row">
            <div className="col-6">
              <Button
                label="Stáhni objednávku"
                id="btn-download"
                handleEvent={handleEvent}
              />
            </div>
            <div className="col-6 fw-bold d-flex align-items-center justify-content-end">
              <Clock />
            </div>
          </div>
        </>
      )}
      <div className="row pt-5">
        <div className="col-6">
          <Button
            id="btn-show"
            label="Ukaž obrázek"
            handleEvent={handleEvent}
          />
        </div>
        <div className="col-6">
          <Button
            id="btn-hide"
            label="Skryj obrázek"
            handleEvent={handleEvent}
          />
        </div>
      </div>
      <Image source={wellness} id="wellness" enabled={show} width="100%" />
      <footer className="text-primary-emphasis mt-3">
        © Světlana Bejlovcová
      </footer>
    </div>
  );
}

export default App;
