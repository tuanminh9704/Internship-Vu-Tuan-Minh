import './Header.scss'

export const Header = () => {
    return (
        <div className="header">
            <div className="logo-header">
                <h2 className="Logo">TuanMinhShop.Com</h2>
            </div>
            <div className="navbar-header">
                <a className="home-header" href="/">Home</a>
                <a className="product-header" href="/products">Products</a>
                <a className="cart-header" href="/carts">Cart</a>
                <a className="login-header" href="/#">Login</a>
                <a className="signup-header" href="/#">SignUp</a>
            </div>
        </div>
    );
}