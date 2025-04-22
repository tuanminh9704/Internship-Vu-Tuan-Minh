import conn from './configs/db.js';

const FirstSeed = async () => {
    try {
        // 1. Insert users
        const [userResult] = await conn.query(`
            INSERT INTO users (name, email, password, role, created_at)
            VALUES 
            ('Alice', 'alice@example.com', 'hashedpassword1', 'user', NOW()),
            ('Bob', 'bob@example.com', 'hashedpassword2', 'admin', NOW())
        `);
        console.log("Seeded users");

        // 2. Insert products
        const [productResult] = await conn.query(`
            INSERT INTO products (name, price, stock, description, category)
            VALUES 
            ('Laptop A', 1000, 10, 'Laptop gaming', 'Electronics'),
            ('Phone X', 500, 20, 'Smartphone mới', 'Mobile'),
            ('Tablet Y', 300, 15, 'Tablet giải trí', 'Tablet')
        `);
        console.log("Seeded products");

        // 3. Insert order
        const [orderResult] = await conn.query(`
            INSERT INTO orders (user_id, total_price, status, created_at)
            VALUES (1, 1500, 'pending', NOW())
        `);
        const orderId = orderResult.insertId;
        console.log("Seeded order, ID:", orderId);

        // 4. Insert order_items
        await conn.query(`
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES 
            (?, 1, 1, 1000),
            (?, 2, 1, 500)
        `, [orderId, orderId]);
        console.log("Seeded order_items");

        console.log("Seed completed successfully!");

    } catch (error) {
        console.error("Error seeding data:", error);
    }
};

FirstSeed();
