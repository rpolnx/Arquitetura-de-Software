import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Dashboard.scss";

function Dashboard() {
  return (
    <div className="pad mx-5" onClick="">
      <Container>
        <Row>
          <Col md="4">
            <a href="/categories">
              <div className="d-flex flex-column text-center border border-dark rounded card-color p-3 card-effect">
                <div className="card-title h5">Categories</div>
                <div>
                  <p>See categories</p>
                </div>
                <div>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </a>
          </Col>
          <Col md="4">
            <a href="/products">
              <div className="d-flex flex-column text-center border border-dark rounded card-color p-3 card-effect">
                <div className="card-title h5">Products</div>
                <div>
                  <p>See products</p>
                </div>
                <div>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </a>
          </Col>
          <Col md="4">
            <a href="/purchases">
              <div className="d-flex flex-column text-center border border-dark rounded card-color p-3 card-effect">
                <div className="card-title h5">Purchases</div>
                <div>
                  <p>See purchases</p>
                </div>
                <div>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </a>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <Row>
          <Col md="4">
            <a href="/sales">
              <div className="d-flex flex-column text-center border border-dark rounded card-color p-3 card-effect">
                <div className="card-title h5">Sales</div>
                <div>
                  <p>See sales</p>
                </div>
                <div>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </a>
          </Col>
          <Col md="4">
            <a href="/sellers">
              <div className="d-flex flex-column text-center border border-dark rounded card-color p-3 card-effect">
                <div className="card-title h5">Sellers</div>
                <div>
                  <p>See sellers</p>
                </div>
                <div>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </a>
          </Col>
          <Col md="4">
            <a href="/suppliers">
              <div className="d-flex flex-column text-center border border-dark rounded card-color p-3 card-effect">
                <div className="card-title h5">Supplier</div>
                <div>
                  <p>See supplier</p>
                </div>
                <div>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
