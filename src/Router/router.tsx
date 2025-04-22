import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetail"));
const CategoryProducts = lazy(() => import("../pages/CategoryProducts"));
const TrackOrder = lazy(() => import("../pages/TrackOrder"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Orders = lazy(() => import("../pages/Orders"));
const Profile = lazy(() => import("../pages/Profile"));
const Search = lazy(() => import("../pages/Search"));

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/products",
                    element: <Products />
                },
                {
                    path: "/search",
                    element: <Search />
                },
                {
                    path: "/product/:id",
                    element: <ProductDetails />
                },
                {
                    path: "/category/:id",
                    element: <CategoryProducts />
                },
                {
                    path: "/track-order",
                    element: <TrackOrder />
                },
                {
                    path: "/track-order/:id",
                    element: <TrackOrder />
                },
                {
                    path: "/wishlist",
                    element: <Wishlist />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/signup",
                    element: <Signup />
                },
                {
                    path: "/cart",
                    element: <Cart />
                },
                {
                    path: "/checkout",
                    element: <Checkout />
                },
                {
                    path: "/profile/orders",
                    element: <Orders />
                },
                {
                    path: "/profile",
                    element: <Profile />
                }
            ]
        }
    ],
    {
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true
        }
    }
);

export default router;