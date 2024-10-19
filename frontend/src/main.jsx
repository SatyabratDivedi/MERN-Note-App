
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NoteTextArea from "./components/mainNoteAreaPage/NoteTextArea.jsx";
import {Toaster} from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import FirstDashboard from "./components/firstDashboard/FirstDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FirstDashboard />,
      },
      {
        path: "/group/:groupName",
        element: <NoteTextArea />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);
