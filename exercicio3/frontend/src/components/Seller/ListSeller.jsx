import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import "./Seller.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellers: []
    };
  }

  async updateSeller(seller) {
    if (window.confirm(`Are you sure you want to update: "${seller.title}"`)) {
      await fetch(`http://localhost:5000/seller/${seller.id}`, {
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

  async deleteSeller(seller) {
    if (window.confirm(`Are you sure you want to delete: "${seller.title}"`)) {
      await fetch(`http://localhost:5000/seller/${seller.id}`, {
        method: "DELETE"
      });
      this.props.loadSellers();
    }
  }

  render() {
    return (
      <>
        <Row className="p-2 mb-2 header">
          <Col md={{ span: 1 }} className="tasks_list">
            <p className="Id">Id</p>
          </Col>
          <Col md={{ span: 2 }} className="tasks_list">
            <p className="Id">Name</p>
          </Col>
          <Col md={{ span: 2 }} className="tasks_list">
            <p className="Id">CPF</p>
          </Col>
          <Col md={{ span: 2 }} className="tasks_list">
            <p className="Id">Work Card</p>
          </Col>
          <Col md={{ span: 2 }} className="tasks_list">
            <p className="Id">Cell Phone</p>
          </Col>
          <Col md={{ span: 2 }} className="tasks_list">
            <p className="Id">Admission</p>
          </Col>
        </Row>
        {this.props.sellers.map((seller, index) => {
          return (
            <Row>
              <Col md={{ span: 1 }} className="tasks_list">
                <p className="Id">{seller.id}</p>
              </Col>
              <Col md={{ span: 2 }} className="tasks_list">
                <p className="desc">{seller.name}</p>
              </Col>
              <Col md={{ span: 2 }} className="tasks_list">
                <p className="cpf">{seller.cpf}</p>
              </Col>
              <Col md={{ span: 2 }} className="tasks_list">
                <p className="admission">{seller.work_card}</p>
              </Col>
              <Col md={{ span: 2 }} className="tasks_list">
                <p className="admission">{seller.telephone}</p>
              </Col>
              <Col md={{ span: 2 }} className="tasks_list">
                <p className="admission">{seller.admission}</p>
              </Col>
              <Col md={{ span: 1 }}>
                <a
                  className="a"
                  href="#"
                  onClick={() => this.updateSeller(seller)}
                >
                  <FontAwesomeIcon icon="edit" />
                </a>
                {"  |  "}
                <a
                  className="a"
                  href="#"
                  onClick={() => this.deleteSeller(seller)}
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

export default ListSeller;
