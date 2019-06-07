import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Supplier.scss";
import ListSupplier from "./ListSupplier";

function Supplier(props) {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({});

  const loadSuppliers = async () => {
    let response = await fetch("http://localhost:5000/supplier");
    const suppliersList = await response.json();
    setSuppliers(suppliersList);
  };

  const createSupplier = async () => {
    if (validator()) {
      await fetch(`http://localhost:5000/supplier`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newSupplier.name,
          cnpj: newSupplier.cnpj,
          social_reason: newSupplier.social_reason,
          address: newSupplier.address,
          telephone: newSupplier.telephone,
          contact: newSupplier.contact
        })
      });
      setNewSupplier("");
      loadSuppliers();
    }
  };

  const validator = () => {
    return (
      newSupplier.name.trim() &&
      newSupplier.cnpj.trim() &&
      newSupplier.social_reason.trim() &&
      newSupplier.address.trim() &&
      newSupplier.telephone.trim() &&
      newSupplier.contact.trim()
    );
  };

  useEffect(() => loadSuppliers(), []);

  return (
    <>
      <Container className="pad default-bg-color text-center rounded">
        <div>
          <h1 className="display-1 p-4 mb-4">Suppliers</h1>
        </div>
      </Container>
      <Container className="default-bg-color p-4 rounded">
        <Form onSubmit={createSupplier}>
          <Row className="pb-2">
            <Col md={{ span: 4 }}>
              <Form.Control
                placeholder="Name"
                value={newSupplier.name || ""}
                onChange={e =>
                  setNewSupplier({
                    name: e.target.value,
                    cnpj: newSupplier.cnpj,
                    social_reason: newSupplier.social_reason,
                    address: newSupplier.address,
                    telephone: newSupplier.telephone,
                    contact: newSupplier.contact
                  })
                }
              />
            </Col>
            <Col md={{ span: 4 }}>
              <Form.Control
                placeholder="Social Reason"
                value={newSupplier.social_reason || ""}
                onChange={e =>
                  setNewSupplier({
                    name: newSupplier.name,
                    cnpj: newSupplier.cnpj,
                    social_reason: e.target.value,
                    address: newSupplier.address,
                    telephone: newSupplier.telephone,
                    contact: newSupplier.contact
                  })
                }
              />
            </Col>
            <Col md={{ span: 2 }}>
              <Form.Control
                placeholder="CNPJ"
                value={newSupplier.cnpj || ""}
                onChange={e =>
                  setNewSupplier({
                    name: newSupplier.name,
                    cnpj: e.target.value,
                    social_reason: newSupplier.social_reason,
                    address: newSupplier.address,
                    telephone: newSupplier.telephone,
                    contact: newSupplier.contact
                  })
                }
              />
            </Col>
            <Col md={{ span: 2 }}>
              <Form.Control
                placeholder="Telephone"
                value={newSupplier.telephone || ""}
                onChange={e =>
                  setNewSupplier({
                    name: newSupplier.name,
                    cnpj: newSupplier.cnpj,
                    social_reason: newSupplier.social_reason,
                    address: newSupplier.address,
                    telephone: e.target.value,
                    contact: newSupplier.contact
                  })
                }
              />
            </Col>
          </Row>
          <Row>
          <Col md={{ span: 4 }}>
              <Form.Control
                placeholder="Adress"
                value={newSupplier.address || ""}
                onChange={e =>
                  setNewSupplier({
                    name: newSupplier.name,
                    cnpj: newSupplier.cnpj,
                    social_reason: newSupplier.social_reason,
                    address: e.target.value,
                    telephone: newSupplier.telephone,
                    contact: newSupplier.contact
                  })
                }
              />
            </Col>
            <Col md={{ span: 4 }}>
              <Form.Control
                placeholder="Contact"
                value={newSupplier.contact || ""}
                onChange={e =>
                  setNewSupplier({
                    name: newSupplier.name,
                    cnpj: newSupplier.cnpj,
                    social_reason: newSupplier.social_reason,
                    address: newSupplier.address,
                    telephone: newSupplier.telephone,
                    contact: e.target.value
                  })
                }
              />
            </Col>
            <Col md={{ span: 4 }}>
              <div className="d-flex flex-row-reverse">
              <Button variant="dark" type="submit" className="">
                Create Supplier
              </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <ListSupplier
          suppliers={suppliers}
          loadSuppliers={loadSuppliers.bind(this)}
        />
      </Container>
    </>
  );
}

export default Supplier;
