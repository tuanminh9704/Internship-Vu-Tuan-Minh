# 🛒 Product + Cart App (Mini Project - Day 18-20)

## Mô tả dự án

Đây là mini project React kết nối trực tiếp với API NodeJS do chính bạn xây dựng. Ứng dụng bao gồm:

- Danh sách sản phẩm với tính năng tìm kiếm và phân trang
- Thêm sản phẩm vào giỏ hàng (Cart)
- Quản lý giỏ hàng với Context + Reducer
- Lưu trạng thái giỏ hàng bằng localStorage
- CRUD sản phẩm với form validate (dùng Ant Design)
- Toast thông báo và Modal xác nhận xóa

---

## 📁 Cấu trúc thư mục

```plaintext

day-11/mini-project-product-cart
│
├── node_modules
├── public
│
└── src
    ├── assets
    ├── components
    │   ├── AllRouter.jsx
    │   ├── CartItems
    │   │   ├── CartItems.jsx
    │   │   └── CartItems.scss
    │   ├── Header
    │   │   ├── Header.jsx
    │   │   └── Header.scss
    │   ├── MainLayout
    │   │   ├── MainLayout.jsx
    │   │   └── MainLayout.scss
    │   └── ProductList
    │       ├── ProductList.jsx
    │       └── ProductList.scss
    │
    ├── contexts
    │   └── CartContext.jsx
    │
    ├── customHooks
    │   └── FetchApiCustom.jsx
    │
    ├── pages
    │   └── Home
    │       └── Home.jsx
    │
    ├── reducers
    │   └── CartReducer.jsx
    │
    ├── routes
    │   └── index.jsx
    │
    ├── App.css
    ├── App.jsx
    ├── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── README.md

```

## 🛠️ Công nghệ sử dụng

- **Frontend**: React, React Router, Context API, Reducer, Ant Design
- **Backend**: NodeJS, Express (tự xây dựng từ tuần trước)
- **Lưu trữ tạm thời**: localStorage (trạng thái Cart)

```


## 🔧 Cài đặt

```bash
git clone https://github.com/your-username/product-cart-app.git
cd product-cart-app
npm install
npm run dev
