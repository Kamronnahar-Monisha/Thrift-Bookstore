import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog/Blog";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
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
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path: '/dashboard/allSellers',
                element:<Dashboard></Dashboard>
            },
            {
                path: '/dashboard/allBuyers',
                element:<Dashboard></Dashboard>
            },
            {
                path: '/dashboard/addAProduct',
                element:<Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myProduct',
                element:<Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myBuyers',
                element:<Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myOrders',
                element:<Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myWishlist',
                element:<Dashboard></Dashboard>
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound></PageNotFound>,
    },
]);