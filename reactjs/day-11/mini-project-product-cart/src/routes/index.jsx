import { Home } from "../pages/Home/Home.jsx";
import { MainLayout } from "../components/MainLayout/MainLayout.jsx";
import { ProductList } from "../components/ProductList/ProductList.jsx";
import { CartItems } from "../components/CartItems/CartItems.jsx";

export const router = [
    {
        path: '/',
        element: <MainLayout />,  
        children: [
            {
                path: '/',
                element: <Home />,  
            },
            {
                path: '/products',
                element: <ProductList />
            },
            {
                path: '/carts',
                element: <CartItems />
            }
        ],
    },
];
