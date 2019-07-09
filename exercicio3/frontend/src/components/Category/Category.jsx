import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Category.scss";
import ListCategory from "./ListCategory";
import axios from 'axios';

function Category(props) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});

  const loadCategories = async () => {
    let response = await axios.get("/category");
    setCategories(response.data);
  };

  const createCategory = async () => {
    if (newCategory.title.trim() && newCategory.description.trim()) {
      await axios.post("/category", {
        title: newCategory.title,
        description: newCategory.description
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
                    ...newCategory,
                    title: e.target.value
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
                    ...newCategory,
                    description: e.target.value
                  })
                }
              />
            </Col>
            <Col md={{ span: 2 }}>
              <Button variant="success" type="submit">
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
