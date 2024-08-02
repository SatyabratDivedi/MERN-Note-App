import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteTextArea from "./components/mainNoteAreaPage/NoteTextArea.jsx";
import { Toaster } from "react-hot-toast";
import { store } from "./reduxStore/store";
import { Provider } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:groupName",
        element: <NoteTextArea />,
      },
      {
        path: "*",
        element: 'I have not create this route',
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);
