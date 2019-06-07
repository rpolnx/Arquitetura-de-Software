import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import "./Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: []
    };
  }

  async updateProducts(product) {
    if (window.confirm(`Are you sure you want to update: "${product.title}"`)) {
      await fetch(`http://localhost:5000/product/${product.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          task: { done: true }
        })
      });
      this.props.loadTasks();
    }
  }

  async deleteSupplier(product) {
    if (window.confirm(`Are you sure you want to delete: "${product.title}"`)) {
      await fetch(`http://localhost:5000/product/${product.id}`, {
        method: "DELETE"
      });
      this.props.loadProducts();
    }
  }

  render() {
    return (
      <>
        <Row className="p-2 mb-2 header">
          <Col md={{ span: 1 }} className="col-product">
            <p className="Id">Id</p>
          </Col>
          <Col md={{ span: 1 }} className="col-product">
            <p className="Id">Category</p>
          </Col>
          <Col md={{ span: 1 }} className="col-product">
            <p className="Id">Supplier</p>
          </Col>
          <Col md={{ span: 2 }} className="col-product">
            <p className="Id">Name</p>
          </Col>
          <Col md={{ span: 2 }} className="col-product">
            <p className="Id">Description</p>
          </Col>
          <Col md={{ span: 1 }} className="col-product">
            <p className="Id">Value</p>
          </Col>
          <Col md={{ span: 1 }} className="col-product">
            <p className="Id">Quantity</p>
          </Col>
          <Col md={{ span: 2 }} className="col-product">
            <p className="Id">Min Qnt.</p>
          </Col>
        </Row>
        {this.props.products.map((product, index) => {
          return (
            <Row>
              <Col md={{ span: 1 }} className="col-product">
                <p className="id">{product.id}</p>
              </Col>
              <Col md={{ span: 1 }} className="col-product">
                <p className="category">{product.category}</p>
              </Col>
              <Col md={{ span: 1 }} className="col-product">
                <p className="supplier">{product.supplier}</p>
              </Col>
              <Col md={{ span: 2 }} className="col-product">
                <p className="name">{product.name}</p>
              </Col>
              <Col md={{ span: 2 }} className="col-product">
                <p className="description">{product.description}</p>
              </Col>
              <Col md={{ span: 1 }} className="col-product">
                <p className="value">{product.value}</p>
              </Col>
              <Col md={{ span: 1 }} className="col-product">
                <p className="quantity">{product.quantity}</p>
              </Col>
              <Col md={{ span: 1 }} className="col-product">
                <p className="minimal_quantity">{product.minimal_quantity}</p>
              </Col>
              <Col md={{ span: 1 }}>
                <a
                  className="a ml-3"
                  href="#"
                  onClick={() => this.updateProducts(product)}
                >
                  <FontAwesomeIcon icon="edit" />
                </a>
                {"  |  "}
                <a
                  className="a"
                  href="#"
                  onClick={() => this.deleteSupplier(product)}
                >
                  <FontAwesomeIcon icon="trash-alt" />
                </a>
              </Col>
            </Row>
          );
        })}
      </>
    );
  }
}

export default ListProduct;
