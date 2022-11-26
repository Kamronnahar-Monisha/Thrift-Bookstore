import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog/Blog";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute.js/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/categories/:id',
                element:<PrivateRoute><CategoryProducts></CategoryProducts></PrivateRoute>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },   
        ]
    },
    {
        path: "*",
        element: <PageNotFound></PageNotFound>,
    },
]);