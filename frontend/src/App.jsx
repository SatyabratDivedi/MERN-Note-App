import { useEffect, useState } from "react";
import Slider from "./components/leftSlider/Slider";
import AddNoteWraper from "./components/addNoteWraperPopUp/AddNotePopUp.jsx";
import { Outlet, useLocation } from "react-router-dom";
import FirstDashboard from "./components/firstDashboard/FirstDashboard.jsx";

function App() {
  const [openWraper, setOpenWraper] = useState(false);
  const [showStartingPage, setShowStartingPage] = useState(true);
  const match = useLocation();

  useEffect(() => {
    if (match.pathname == "/") {
      setShowStartingPage(true);
    } else {
      setShowStartingPage(false);
    }
  }, [match.pathname]);

  return (
    <>
      <div>
        <div>
          <Slider openWraper={openWraper} setOpenWraper={setOpenWraper} />
          <div className=' notesArea'>{showStartingPage ? <FirstDashboard /> : <Outlet />}</div>
        </div>
        {openWraper && (
          <div className='addNoteWraperMain'>
            <AddNoteWraper openWraper={openWraper} setOpenWraper={setOpenWraper} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
