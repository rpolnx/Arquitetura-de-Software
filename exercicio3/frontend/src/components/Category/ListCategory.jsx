import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import "./Category.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  async updateCategory(category) {
    if (
      window.confirm(`Are you sure you want to update: "${category.title}"`)
    ) {
      await fetch(`http://localhost:3001/tasks/${category.id}`, {
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

  async deleteCategory(category) {
    if (
      window.confirm(`Are you sure you want to delete: "${category.title}"`)
    ) {
      await fetch(`http://localhost:5000/category/${category.id}`, {
        method: "DELETE"
      });
      this.props.loadCategories();
    }
  }

  render() {
    return (
      <>
        <Row className="p-2 mb-2 header">
          <Col md={{ span: 1 }} className="tasks_list">
            <p className="Id">Id</p>
          </Col>
          <Col md={{ span: 3 }} className="tasks_list">
            <p className="Id">Name</p>
          </Col>
          <Col md={{ span: 8 }} className="tasks_list">
            <p className="Id">Description</p>
          </Col>
        </Row>
        {this.props.categories.map((category, index) => {
          return (
            <Row>
              <Col md={{ span: 1 }} className="tasks_list">
                <p className="Id">{category.id}</p>
              </Col>
              <Col md={{ span: 3 }} className="tasks_list">
                <p className="title">{category.title}</p>
              </Col>
              <Col md={{ span: 7 }} className="tasks_list">
                <p className="desc">{category.description}</p>
              </Col>
              <Col md={{ span: 1 }}>
                <a
                  className="a"
                  href="#"
                  onClick={() => this.updateCategory(category)}
                >
                  <FontAwesomeIcon icon="edit" />
                </a>
                {"  |  "}
                <a
                  className="a"
                  href="#"
                  onClick={() => this.deleteCategory(category)}
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

export default ListCategory;
