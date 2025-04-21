import conn from '../configs/database.js';

const products = [
    {
        id: 1,
        name: 'iPhone 13',
        price: 899,
        description: 'Apple smartphone 128GB',
        stock: 20,
    },
    {
        id: 2,
        name: 'Samsung Galaxy S21',
        price: 799,
        description: 'Samsung smartphone flagship',
        stock: 15,
    },
    {
        id: 3,
        name: 'Xiaomi Redmi Note 11',
        price: 299,
        description: 'Affordable smartphone with good battery',
        stock: 30,
    },
];

try {
    const values = products.map(p => [p.id, p.name, p.price, p.description, p.stock]);

    for (const value of values) {
        let mysqlInsertCommand = 'INSERT INTO products (id, name, price, description, stock) values '
        mysqlInsertCommand = mysqlInsertCommand + ` (${value.id}, '${value.name}', ${value.price}, '${value.description}', ${value.stock})`;
        conn.query(mysqlInsertCommand, (err, result, fields))
        console.log('Running success!');
    }
} catch (err) {
    console.error('Seeding error:', err.message);
}
