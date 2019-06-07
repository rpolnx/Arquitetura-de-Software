import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Category.scss";
import ListSupplier from "./ListSupplier";

function EditCategory(props) {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    let response = await fetch("http://localhost:5000/category");
    const categoriesList = await response.json();
    setCategories(categoriesList);
  };

  const updateCategory = async category => {
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
  };

  useEffect(() => loadCategories(), []);

  return (
    <Container className="pad default-bg-color p-4">
      <Form onSubmit={updateCategory}>
        <Row>
          <Col md={{ span: 3 }}>
            <Form.Control
              placeholder="Name"
              value={newCategory.title || ""}
              onChange={e =>
                setNewCategory({
                  title: e.target.value,
                  description: newCategory.description
                })
              }
            />
          </Col>
          <Col md={{ span: 7 }}>
            <Form.Control
              placeholder="Description"
              value={newCategory.description || ""}
              onChange={e =>
                setNewCategory({
                  title: newCategory.title,
                  description: e.target.value
                })
              }
            />
          </Col>
          <Col md={{ span: 2 }}>
            <Button variant="dark" type="submit">
              Create Category
            </Button>
          </Col>
        </Row>
      </Form>
      <ListSupplier
        categories={categories}
        loadCategories={loadCategories.bind(this)}
      />
    </Container>
  );
}

export default EditCategory;
