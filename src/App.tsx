import { RouterProvider, createBrowserRouter } from "react-router";

// Create a router instance using React Router's built-in function
const router = createBrowserRouter(
  // @ts-ignore - This will be replaced by the React Router Vite plugin
  __ROUTES__
);

export default function App() {
  return <RouterProvider router={router} />;
}