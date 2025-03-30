import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { CategoryProducts, Home, Login, ProductDetails, Products, TrackOrder, Wishlist } from "../pages";


const router = createBrowserRouter([
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
                path: "/wishlist",
                element: <Wishlist />
            },
            {
                path: "/login",
                element: <Login />
            },
        ]
    }]
)

export default router;