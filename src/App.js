import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import TelegramWebApp from "./compo1";
import CatsInterface from "./compo2";
import LeaderboardInterface from "./compo3";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <CatsInterface />,
        },
        {
          path: "/telegram",
          element: <LeaderboardInterface />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
