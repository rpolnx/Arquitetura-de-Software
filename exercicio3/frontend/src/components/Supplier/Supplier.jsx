import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Supplier.scss";
import ListSupplier from "./ListSupplier";
import axios from "axios";

function Supplier(props) {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({});

  const loadSuppliers = async () => {
    let response = await axios.get("/supplier");
    setSuppliers(response.data);
  };

  const createSupplier = async () => {
    if (validator()) {
      await axios.post("/supplier", {
        name: newSupplier.name,
        cnpj: newSupplier.cnpj,
        social_reason: newSupplier.social_reason,
        address: newSupplier.address,
        telephone: newSupplier.telephone,
        contact: newSupplier.contact
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
                    ...newSupplier,
                    name: e.target.value
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
                    ...newSupplier,
                    social_reason: e.target.value
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
                    ...newSupplier,
                    cnpj: e.target.value
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
                    ...newSupplier,
                    telephone: e.target.value
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
                    ...newSupplier,
                    address: e.target.value
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
                    ...newSupplier,
                    contact: e.target.value
                  })
                }
              />
            </Col>
            <Col md={{ span: 4 }}>
              <div className="d-flex flex-row-reverse">
                <Button variant="success" type="submit" className="">
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
