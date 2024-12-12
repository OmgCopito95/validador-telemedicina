import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "../components/Layout/Layout";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "*",
          element: <ErrorPage />,
        },
        {
          path: "/error",
          element: <ErrorPage />,
        },
      ],
    },
  ],
  {
    basename: `${import.meta.env.VITE_ROUTE_NAME}`,
  }
);

export default router;
