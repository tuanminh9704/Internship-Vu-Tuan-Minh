import './Header.scss'
import {Link} from 'react-router-dom';

export const Header = () => {
    return (
        <div className="header">
            <div className="logo-header">
                <h2 className="Logo">TuanMinhShop.Com</h2>
            </div>
            <div className="navbar-header">
                <Link className="home-header" to="/">Home</Link>
                <Link className="product-header" to="/products">Products</Link>
                <Link className="cart-header" to="/carts">Cart</Link>
                <Link className="login-header" to="/">Login</Link>
                <Link className="signup-header" to="/">SignUp</Link>
            </div>
        </div>
    );
}