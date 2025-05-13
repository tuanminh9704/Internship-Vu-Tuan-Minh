import { Link } from "@remix-run/react";

export const  Header = () => {
  return (
    <header style={{ padding: "1rem", background: "#f5f5f5" }}>
      <nav>
        <Link to="/app" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/app/products" style={{ marginRight: "1rem" }}>Product</Link>
        <Link to="/app/cart">Cart</Link>
      </nav>
    </header>
  );
}
