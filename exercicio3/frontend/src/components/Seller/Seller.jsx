import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Seller.scss";
import ListSeller from "./ListSeller";

function Seller(props) {
  const [sellers, setSeller] = useState([]);
  const [newSeller, setNewSeller] = useState({});

  const loadSellers = async () => {
    let response = await fetch("http://localhost:5000/seller");
    const sellersList = await response.json();
    setSeller(sellersList);
  };

  const createSeller = async () => {
    if (newSeller.name.trim() && newSeller.cpf.trim() && newSeller.work_card.trim() && newSeller.telephone.trim()) {
      await fetch(`http://localhost:5000/seller`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpf: newSeller.cpf,
          name: newSeller.name,
          work_card: newSeller.work_card,
          telephone: newSeller.telephone
        })
      });
      setNewSeller("");
      loadSellers();
    }
  };

  useEffect(() => loadSellers(), []);

  return (
    <>
      <Container className="pad default-bg-color text-center rounded">
        <div>
          <h1 className="display-1 p-4 mb-4">Sellers</h1>
        </div>
      </Container>
      <Container className="default-bg-color p-4 rounded">
        <Form onSubmit={createSeller}>
          <Row>
            <Col md={{ span: 3 }}>
              <Form.Control
                placeholder="Name"
                value={newSeller.name || ""}
                onChange={e =>
                  setNewSeller({
                    name: e.target.value,
                    cpf: newSeller.cpf,
                    work_card: newSeller.work_card,
                    telephone: newSeller.telephone,
                  })
                }
              />
            </Col>
            <Col md={{ span: 2 }}>
              <Form.Control
                placeholder="CPF"
                value={newSeller.cpf || ""}
                onChange={e =>
                  setNewSeller({
                    name: newSeller.name,
                    cpf: e.target.value,
                    work_card: newSeller.work_card,
                    telephone: newSeller.telephone,
                  })
                }
              />
            </Col>
            <Col md={{ span: 2 }}>
              <Form.Control
                placeholder="Work Card"
                value={newSeller.work_card || ""}
                onChange={e =>
                  setNewSeller({
                    name: newSeller.name,
                    cpf: newSeller.cpf,
                    work_card: e.target.value,
                    telephone: newSeller.telephone,
                  })
                }
              />
            </Col>
            <Col md={{ span: 3 }}>
              <Form.Control
                placeholder="Cell phone"
                value={newSeller.telephone || ""}
                onChange={e =>
                  setNewSeller({
                    name: newSeller.name,
                    cpf: newSeller.cpf,
                    work_card: newSeller.work_card,
                    telephone: e.target.value,
                  })
                }
              />
            </Col>
            <Col md={{ span: 2 }}>
              <Button variant="dark" type="submit" className="float-right">
                Create Seller
              </Button>
            </Col>
          </Row>
        </Form>
        <ListSeller
          sellers={sellers}
          loadSellers={loadSellers.bind(this)}
        />
      </Container>
    </>
  );
}

export default Seller;
