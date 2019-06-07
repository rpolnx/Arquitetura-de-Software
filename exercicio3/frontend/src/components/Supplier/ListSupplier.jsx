import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import "./Supplier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: []
    };
  }

  async updateSuppliers(supplier) {
    if (
      window.confirm(`Are you sure you want to update: "${supplier.title}"`)
    ) {
      await fetch(`http://localhost:5000/supplier/${supplier.id}`, {
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

  async deleteSupplier(supplier) {
    if (
      window.confirm(`Are you sure you want to delete: "${supplier.title}"`)
    ) {
      await fetch(`http://localhost:5000/supplier/${supplier.id}`, {
        method: "DELETE"
      });
      this.props.loadSuppliers();
    }
  }

  render() {
    return (
      <>
        <Row className="p-2 mb-2 header">
          <Col md={{ span: 1 }} className="col-supplier">
            <p className="Id">Id</p>
          </Col>
          <Col md={{ span: 2 }} className="col-supplier">
            <p className="Id">Name</p>
          </Col>
          <Col md={{ span: 2 }} className="col-supplier">
            <p className="Id">Social Reason</p>
          </Col>
          <Col md={{ span: 1 }} className="col-supplier">
            <p className="Id">CNPJ</p>
          </Col>
          <Col md={{ span: 1 }} className="col-supplier">
            <p className="Id">Telephone</p>
          </Col>
          <Col md={{ span: 2 }} className="col-supplier">
            <p className="Id ml-4">Address</p>
          </Col>
          <Col md={{ span: 2 }} className="col-supplier">
            <p className="Id">Contact</p>
          </Col>
        </Row>
        {this.props.suppliers.map((supplier, index) => {
          return (
            <Row>
              <Col md={{ span: 1 }} className="col-supplier">
                <p className="id">{supplier.id}</p>
              </Col>
              <Col md={{ span: 2 }} className="col-supplier">
                <p className="name">{supplier.name}</p>
              </Col>
              <Col md={{ span: 2 }} className="col-supplier">
                <p className="social_reason">{supplier.social_reason}</p>
              </Col>
              <Col md={{ span: 1 }} className="col-supplier">
                <p className="cnpj">{supplier.cnpj}</p>
              </Col>
              <Col md={{ span: 1 }} className="col-supplier">
                <p className="telephone">{supplier.telephone}</p>
              </Col>
              <Col md={{ span: 2 }} className="col-supplier">
                <p className="address ml-4">{supplier.address}</p>
              </Col>
              <Col md={{ span: 2 }} className="col-supplier">
                <p className="contact">{supplier.contact}</p>
              </Col>
              <Col md={{ span: 1 }}>
                <a
                  className="a ml-3"
                  href="#"
                  onClick={() => this.updateSuppliers(supplier)}
                >
                  <FontAwesomeIcon icon="edit" />
                </a>
                {"  |  "}
                <a
                  className="a"
                  href="#"
                  onClick={() => this.deleteSupplier(supplier)}
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

export default ListSupplier;
