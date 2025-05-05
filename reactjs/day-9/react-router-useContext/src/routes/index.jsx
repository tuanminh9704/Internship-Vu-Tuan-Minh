import { ProductDetail } from '../components/ProductDetail/ProductDetail.jsx';
import {Home} from '../pages/Home/Home.jsx'
import { Product } from '../pages/Product/Product.jsx';
import { ProductList } from '../components/ProductList/ProductList.jsx';
import { Cart } from '../pages/Cart/Cart.jsx';
export const router = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/products',
        element: <Product />,
        children: [
            { index: true, element: <ProductList /> }, 
            { path: ':id', element: <ProductDetail /> },
        ]
    },
    {
        path: '/carts',
        element: <Cart />
    }
]