import './Header.scss';
import {Search} from 'lucide-react'

export const Header = () => {
    return (
        <header className="header">
        <div className="header__container">
            <div className="header__logo">
                <a href="#" className='logo'>SimpleShop.com</a>
            </div>
            <div className='header__search'>
                <input type="text" placeholder='Tim kiếm sản phẩm' className='search-input'/>
                <Search className='search'/>
            </div>
            <nav className="header__nav">
            <a href="#" className="header__link">Home</a>
            <a href="#" className="header__link">Products</a>
            <a href="#" className="header__link">Cart</a>
            <a href="#" className="header__link">Register</a>
            <a href='#' className='header__link'>Login</a>
            </nav>
        </div>
        </header>
    );
};
