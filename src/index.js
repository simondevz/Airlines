import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  json,
} from "react-router-dom";

import App from "./components/App";
import ErrorPage from "./components/error/error";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import reportWebVitals from "./reportWebVitals";

const time = Math.floor(Date.now() / 1000);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        loader: async () => {
          let user = JSON.parse(localStorage.getItem("airlines_user"));
          if (!user?.username) return redirect("login");

          const response = await fetch(
            `https://opensky-network.org/api/flights/all?begin=${
              time - 7000
            }&end=${time}`
          );
          console.log(response)
            
          if (response.status !== 200) {
            throw json({
              msg: "Sorry, something went wrong",
              status: response.status,
            });
          }
          const data = await response.json();

          return {
            user,
            data,
            time,
          };
        },
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CssBaseline />
    <RouterProvider router={router} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
