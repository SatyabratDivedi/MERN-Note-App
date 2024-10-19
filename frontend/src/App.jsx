import {useState} from "react";
import Slider from "./components/leftSlider/Slider";
import AddNoteWraper from "./components/addNoteWraperPopUp/AddNotePopUp.jsx";
import {Outlet} from "react-router-dom";
import {SliderContext} from "./context/SliderContext.js";

function App() {
  const [openWraper, setOpenWraper] = useState(false);
  const [closeSlider, setCloseSlider] = useState(false);

  return (
    <SliderContext.Provider value={{closeSlider, setCloseSlider}}>
      <div>
        <div>
          <Slider openWraper={openWraper} setOpenWraper={setOpenWraper} />
          <div className=" notesArea">
            <Outlet />
          </div>
        </div>
        {openWraper && (
          <div className="addNoteWraperMain">
            <AddNoteWraper openWraper={openWraper} setOpenWraper={setOpenWraper} />
          </div>
        )}
      </div>
    </SliderContext.Provider>
  );
}

export default App;
