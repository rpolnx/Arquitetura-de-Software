import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Product.scss";
import ListProduct from "./ListProduct";

function Product(props) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});

  const loadProducts = async () => {
    let response = await fetch("http://localhost:5000/product");
    const productsList = await response.json();
    setProducts(productsList);
  };

  const createProduct = async () => {
    if (validator()) {
      await fetch(`http://localhost:5000/product`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          value: newProduct.value,
          quantity: newProduct.quantity,
          minimal_quantity: newProduct.minimal_quantity,
          supplier: newProduct.supplier,
          category: newProduct.category
        })
      });
      setNewProduct("");
      loadProducts();
    }
  };

  const validator = () => {
    return (
      newProduct.name.trim() &&
      newProduct.description.trim() &&
      newProduct.value.trim() &&
      newProduct.quantity.trim() &&
      newProduct.minimal_quantity.trim() &&
      newProduct.supplier.trim() &&
      newProduct.category.trim()
    );
  };

  useEffect(() => loadProducts(), []);

  return (
    <>
      <Container className="pad default-bg-color text-center rounded">
        <div>
          <h1 className="display-1 p-4 mb-4">Products</h1>
        </div>
      </Container>
      <Container className="default-bg-color p-4 rounded">
        <Form onSubmit={createProduct}>
          <Row className="pb-2">
            <Col md={{ span: 3 }}>
              <Form.Control
                placeholder="Name"
                value={newProduct.name || ""}
                onChange={e =>
                  setNewProduct({
                    name: e.target.value,
                    description: newProduct.description,
                    value: newProduct.value,
                    quantity: newProduct.quantity,
                    minimal_quantity: newProduct.minimal_quantity,
                    supplier: newProduct.supplier,
                    category: newProduct.category
                  })
                }
              />
            </Col>
            <Col md={{ span: 5 }}>
              <Form.Control
                placeholder="Description"
                value={newProduct.description || ""}
                onChange={e =>
                  setNewProduct({
                    name: newProduct.name,
                    description: e.target.value,
                    value: newProduct.value,
                    quantity: newProduct.quantity,
                    minimal_quantity: newProduct.minimal_quantity,
                    supplier: newProduct.supplier,
                    category: newProduct.category
                  })
                }
              />
            </Col>
            <Col md={{ span: 2 }}>
              <Form.Control
                placeholder="Value"
                value={newProduct.value || ""}
                onChange={e =>
                  setNewProduct({
                    name: newProduct.name,
                    description: newProduct.description,
                    value: e.target.value,
                    quantity: newProduct.quantity,
                    minimal_quantity: newProduct.minimal_quantity,
                    supplier: newProduct.supplier,
                    category: newProduct.category
                  })
                }
              />
            </Col>
            <Col md={{ span: 2 }}>
              <Form.Control
                placeholder="Quantity"
                value={newProduct.quantity || ""}
                onChange={e =>
                  setNewProduct({
                    name: newProduct.name,
                    description: newProduct.description,
                    value: newProduct.value,
                    quantity: e.target.value,
                    minimal_quantity: newProduct.minimal_quantity,
                    supplier: newProduct.supplier,
                    category: newProduct.category
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 2 }}>
              <Form.Control
                placeholder="Min Quantity"
                value={newProduct.minimal_quantity || ""}
                onChange={e =>
                  setNewProduct({
                    name: newProduct.name,
                    description: newProduct.description,
                    value: newProduct.value,
                    quantity: newProduct.quantity,
                    minimal_quantity: e.target.value,
                    supplier: newProduct.supplier,
                    category: newProduct.category
                  })
                }
              />
            </Col>
            <Col md={{ span: 3 }}>
              <Form.Control
                placeholder="Supplier"
                value={newProduct.supplier || ""}
                onChange={e =>
                  setNewProduct({
                    name: newProduct.name,
                    description: newProduct.description,
                    value: newProduct.value,
                    quantity: newProduct.quantity,
                    minimal_quantity: newProduct.minimal_quantity,
                    supplier: e.target.value,
                    category: newProduct.category
                  })
                }
              />
            </Col>
            <Col md={{ span: 3 }}>
              <Form.Control
                placeholder="Category"
                value={newProduct.category || ""}
                onChange={e =>
                  setNewProduct({
                    name: newProduct.name,
                    description: newProduct.description,
                    value: newProduct.value,
                    quantity: newProduct.quantity,
                    minimal_quantity: newProduct.minimal_quantity,
                    supplier: newProduct.supplier,
                    category: e.target.value
                  })
                }
              />
            </Col>
            <Col md={{ span: 4 }}>
              <div className="d-flex flex-row-reverse">
              <Button variant="dark" type="submit" className="">
                Create Product
              </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <ListProduct
          products={products}
          loadProducts={loadProducts.bind(this)}
        />
      </Container>
    </>
  );
}

export default Product;
