import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Product.scss";
import ListProduct from "./ListProduct";
import axios from "axios";

function Product(props) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});

  const loadProducts = async () => {
    let response = await axios.get("/product");
    setProducts(response.data);
  };

  const createProduct = async () => {
    if (validator()) {
      await axios.post("/product", {
        name: newProduct.name,
        description: newProduct.description,
        value: newProduct.value,
        quantity: newProduct.quantity,
        minimal_quantity: newProduct.minimal_quantity,
        supplier: newProduct.supplier,
        category: newProduct.category
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
                    ...newProduct,
                    name: e.target.value                    
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
                    ...newProduct,
                    description: e.target.value
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
                    ...newProduct,
                    value: e.target.value
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
                    ...newProduct,
                    quantity: e.target.value
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
                    ...newProduct,
                    minimal_quantity: e.target.value
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
                    ...newProduct,
                    supplier: e.target.value
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
                    ...newProduct,
                    category: e.target.value
                  })
                }
              />
            </Col>
            <Col md={{ span: 4 }}>
              <div className="d-flex flex-row-reverse">
                <Button variant="success" type="submit" className="">
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
