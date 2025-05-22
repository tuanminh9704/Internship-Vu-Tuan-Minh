# Day 26: Tổng quan Remix + Setup Shopify Remix App
## Nội dung chính
- Giới thiệu Remix framework
- Vì sao Shopify chọn Remix làm default App framework?
- Setup dự án Remix với Shopify CLI
- Cấu trúc chuẩn 1 Remix Shopify App
- Data Loader, Action, Route in Remix

## 1, Giới thiệu Remix framework
Remix là một framework hiện đại và mạnh mẽ cho việc xây dựng các ứng dụng web, được thiết kế để giúp bạn xây dựng các trang web nhanh chóng, linh hoạt và tối ưu hóa hiệu suất. Remix sử dụng React và kết hợp với các kỹ thuật như server-side rendering (SSR), static site generation (SSG), và data fetching trực tiếp từ phía server, giúp tăng cường trải nghiệm người dùng và cải thiện SEO.

### A, Các tính năng nổi bật của Remix:
- Tốc độ tải trang nhanh hơn nhờ SSR và SSG.

- Data Fetching dễ dàng và hiệu quả với cách tiếp cận loaders.

- Error boundaries giúp xử lý lỗi một cách dễ dàng và chính xác.

- Full-stack capabilities, giúp xử lý dữ liệu, routes, và giao diện người dùng trong một ứng dụng duy nhất.

- Hỗ trợ hiện đại cho việc tích hợp các công nghệ web hiện đại.

## 2, Vì sao Shopify chọn Remix làm default App Framework?

Shopify đã chọn Remix làm framework mặc định cho các ứng dụng Shopify App vì những lý do sau:

- Hiệu suất tối ưu: Remix hỗ trợ SSR và có thể load dữ liệu trực tiếp từ server giúp giảm thời gian tải trang và tối ưu hóa tốc độ trang.

- Dễ dàng tích hợp với GraphQL: Remix có khả năng tích hợp tốt với GraphQL, giúp Shopify App dễ dàng truy vấn và thay đổi dữ liệu từ Shopify API.

- Cấu trúc rõ ràng và dễ quản lý: Remix cung cấp một cấu trúc thư mục rõ ràng và dễ hiểu, giúp quản lý mã nguồn, logic nghiệp vụ, và giao diện người dùng trong các ứng dụng Shopify.

- Tích hợp với các công cụ hiện đại: Remix hỗ trợ các công cụ phát triển hiện đại như Webpack, ES modules, và caching, giúp các ứng dụng Shopify trở nên linh hoạt và dễ bảo trì.

=> Chính vì những lợi thế này, Remix đã được Shopify chọn làm framework mặc định để phát triển các ứng dụng tích hợp với Shopify.

## 3, Setup Dự Án Remix với Shopify CLI

Chạy câu lệnh:
```
npm init @shopify/app@latest
```

## 4,  Data Loader, Action, Route in Remix

4.1 Data Loader 

Loader là một hàm bất đồng bộ (async) dùng để lấy dữ liệu trước khi render trang. Nó chỉ chạy trên server.
 Ví dụ: 

```
// app/routes/products.tsx
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return json(products);
};

export default function ProductsPage() {
  const products = useLoaderData<typeof loader>();
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

4.2 Action – Xử lý POST, PUT, DELETE (Form Submission)

Action là hàm bất đồng bộ xử lý logic phía server, thường dùng cho form hoặc mutation.

```
// app/routes/products.tsx
import { json, redirect } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get("name");

  // Gọi API hoặc lưu vào DB...
  if (!name) return json({ error: "Tên không được để trống" }, { status: 400 });

  return redirect("/products");
};

export default function AddProduct() {
  const actionData = useActionData();
  return (
    <Form method="post">
      <input name="name" placeholder="Tên sản phẩm" />
      {actionData?.error && <p>{actionData.error}</p>}
      <button type="submit">Tạo</button>
    </Form>
  );
}
```

4.3 Route
Trong Remix, mỗi file trong thư mục routes/ chính là một route.

```
app/routes/
├── index.tsx         => /
├── products.tsx      => /products
├── orders/$id.tsx    => /orders/:id
```










