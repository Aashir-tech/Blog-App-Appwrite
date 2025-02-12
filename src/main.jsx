import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {createBrowserRouter , RouterProvider} from 'react-router-dom'

import { AuthLayout } from "./components/index.js"; 
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost'
import AllPosts from './pages/AllPosts'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login.jsx'
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/',
        element : <Home />,
      },
      {
        path : '/login',
        element : (
          <AuthLayout authentication={false}>
              <Login />
          </AuthLayout>
        )
      },
      {
        path : '/signup',
        element : (
          <AuthLayout authentication={false}>
              <SignUp />
          </AuthLayout>
        )
      },
      {
        path : '/all-posts',
        element : (
          <AuthLayout authentication>
              <AllPosts />
          </AuthLayout>
        )
      },
      {
        path : '/add-post',
        element : (
          <AuthLayout authentication>
              <AddPost />
          </AuthLayout>
        )
      },
      {
        path : '/post/:slug',
        element : <Post />
      },
      {
        path : '/edit-post/:slug',
        element : (
          <AuthLayout authentication>
              <EditPost />
          </AuthLayout>
        )
      }
    ]
  }
])


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
