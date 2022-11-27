import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AddAProduct from "../Pages/AddAProduct/AddAProduct/AddAProduct";
import Blog from "../Pages/Blog/Blog";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import MyOrder from "../Pages/Dashboard/MyOrder/MyOrder/MyOrder";
import MyProduct from "../Pages/Dashboard/MyProduct/MyProduct/MyProduct";
import WishList from "../Pages/Dashboard/WishList/WishList/WishList";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Register from "../Pages/Register/Register";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import PrivateRoute from "./PrivateRoute.js/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";

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
                element:<SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
            {
                path: '/dashboard/myProduct',
                element:<SellerRoute><MyProduct></MyProduct></SellerRoute>
            },
            {
                path: '/dashboard/myBuyers',
                element:<Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myOrders',
                element:<BuyerRoute><MyOrder></MyOrder></BuyerRoute>
            },
            {
                path: '/dashboard/myWishlist',
                element:<BuyerRoute><WishList></WishList></BuyerRoute>
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound></PageNotFound>,
    },
]);