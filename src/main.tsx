import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./login/Signup.tsx";
import Signin from "./login/Signin.tsx";
import TodoApp from "./components/TodoApp.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "1051054790619-e3l0a1rugo10svqp5snb8hq8v2lsu77e.apps.googleusercontent.com";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
  { path: "/TodoApp", element: <TodoApp /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
