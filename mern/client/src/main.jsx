import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import RecordList from "./components/RecordList.jsx";
import Record from "./components/Record.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,            // shared layout (navbar etc.)
    children: [
      { path: "/", element: <RecordList /> },        // table of employees
      { path: "/create", element: <Record /> },      // empty form
      { path: "/edit/:id", element: <Record /> },    // same form, filled in
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);