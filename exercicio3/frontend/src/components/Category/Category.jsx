import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Category.scss";
import ListCategory from "./ListCategory";

function Category(props) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});

  const loadCategories = async () => {
    let response = await fetch("http://localhost:5000/category");
    const categories = await response.json();
    setCategories(categories);
  };

  const createCategory = async () => {
    if (newCategory.title.trim() && newCategory.description.trim()) {
      await fetch(`http://localhost:5000/category`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newCategory.title,
          description: newCategory.description
        })
      });
      setNewCategory("");
      loadCategories();
    }
  };

  useEffect(() => loadCategories(), []);

  return (
    <>
      <Container className="pad default-bg-color text-center rounded">
        <div>
          <h1 className="display-1 p-4 mb-4">Categories</h1>
        </div>
      </Container>
      <Container className="default-bg-color p-4 rounded">
        <Form onSubmit={createCategory}>
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
        <ListCategory
          categories={categories}
          loadCategories={loadCategories.bind(this)}
        />
      </Container>
    </>
  );
}

export default Category;
