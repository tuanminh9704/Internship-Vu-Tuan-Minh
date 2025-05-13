import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  const products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
  ];

  return products;
};

export default function Products() {
  const products = useLoaderData();

  return (
    <div>
      <h1>Product List</h1>
      {products.message ? (
        <p>{products.message}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
