import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BlogProvider } from "./context/PostProvider";
import { HomePage } from "./pages/export_pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BlogProvider>
      <RouterProvider router={router} />
    </BlogProvider>
  </StrictMode>
);
