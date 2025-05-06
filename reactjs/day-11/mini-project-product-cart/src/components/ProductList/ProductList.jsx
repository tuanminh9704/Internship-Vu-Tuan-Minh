import "./ProductList.scss";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/CartContext";
import { Pagination, Form, Button, Input, Modal, Alert } from "antd";

export const ProductList = () => {
  const [datas, setDatas] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [editingProduct, setEditingProduct] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [searchItem, setSearchItems] = useState("");
    console.log(searchItem);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const fetchProduct = () => {
    fetch(
      `http://localhost:3000/products?page=${currentPage}&name=${searchItem}`
    )
      .then((response) => response.json())
      .then((result) => {
        setDatas(result.data);
        setPageSize(result.pagination.pageSize);
        setTotalItem(result.pagination.totalItem);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [currentPage, searchItem]);

  const { addToCart } = useContext(CartContext);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onFinish = (dataForm) => {
    fetch("http://localhost:3000/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    }).then(() => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      form.resetFields();
    });
  };

  const onDelete = (productId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (!confirmed) return;

    fetch(`http://localhost:3000/admin/products/${productId}`, {
      method: "DELETE",
    }).then(() => {
      setDatas((prev) => prev.filter((item) => item.id !== productId));
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    });
  };

  const onEdit = (product) => {
    setEditingProduct(product);
    editForm.setFieldsValue(product);
    setEditModal(true);
  };

  const onFinishEdit = (dataForm) => {
    fetch(`http://localhost:3000/admin/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    }).then(() => {
      setSuccess(true);
      fetchProduct();
      setEditModal(false);
      setTimeout(() => setSuccess(false), 3000);
    });
  };

  return (
    <div className="product-list">
      <h2>Danh sách sản phẩm</h2>
      <div className="search-bar">
        <Input.Search
          placeholder="Tìm kiếm sản phẩm..."
          allowClear
          onSearch={(value) => {
            setSearchItems(value);
          }}
          enterButton
        />
      </div>
      <Button type="primary" onClick={() => setModal(true)}>
        Thêm sản phẩm
      </Button>
      {deleteSuccess && (
        <Alert
          message="Xóa sản phẩm thành công"
          type="success"
          showIcon
          style={{ margin: "16px 0" }}
        />
      )}
      <Modal
        title="Thêm sản phẩm"
        style={{ top: 20 }}
        centered
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        {success && (
          <Alert
            message="Thêm sản phẩm thành công"
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            name: "",
            price: "",
            stock: "",
            description: "",
            category: "",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Giá không được để trống" },
              {
                pattern: /^[0-9]+$/,
                message: "Số lượng phải là một số nguyên dương",
              },
            ]}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[
              { required: true, message: "Số lượng không được để trống" },
              {
                pattern: /^[0-9]+$/,
                message: "Số lượng phải là một số nguyên dương",
              },
            ]}
          >
            <Input placeholder="Stock" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Mô tả không được để trống" }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Danh mục không được để trống" },
            ]}
          >
            <Input placeholder="Category" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Sửa sản phẩm"
        style={{ top: 20 }}
        centered
        open={editModal}
        onCancel={() => setEditModal(false)}
        footer={null}
      >
        {success && (
          <Alert
            message="Sửa sản phẩm thành công"
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form
          form={editForm}
          onFinish={onFinishEdit}
          initialValues={{
            name: "",
            price: "",
            stock: "",
            description: "",
            category: "",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Giá không được để trống" },
              {
                pattern: /^[0-9]+$/,
                message: "Số lượng phải là một số nguyên dương",
              },
            ]}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[
              { required: true, message: "Số lượng không được để trống" },
              {
                pattern: /^[0-9]+$/,
                message: "Số lượng phải là một số nguyên dương",
              },
            ]}
          >
            <Input placeholder="Stock" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Mô tả không được để trống" }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Danh mục không được để trống" },
            ]}
          >
            <Input placeholder="Category" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="product-box">
        {datas.map((product) => (
          <div key={product.id} className="product-item">
            <img
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              className="product-image"
              alt={product.name}
            />
            <div className="product-info">
              <a className="title" href={`/products/${product.id}`}>
                {product.name}
              </a>
              <p className="price">${product.price}</p>
              <div className="action-buttons">
                <Button type="primary" onClick={() => addToCart(product)}>
                  Thêm
                </Button>
                <Button
                  onClick={() => onDelete(product.id)}
                  danger
                  type="primary"
                  style={{ marginLeft: 8 }}
                >
                  Xóa
                </Button>
                <Button
                  onClick={() => onEdit(product)}
                  type="default"
                  style={{ marginLeft: 8 }}
                >
                  Sửa
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <Pagination
          current={currentPage}
          total={totalItem}
          pageSize={pageSize}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};
