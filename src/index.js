import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './demo/index';
import ErrorPage from "./error-page";
import BreadcrumbPage from "./demo/breadcrumb-page";
import FolderListPage from "./demo/folder-list-page";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/breadcrumb-page",
        element: <BreadcrumbPage />,
      },
      {
        path: "/folder-list-page",
        element: <FolderListPage />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);