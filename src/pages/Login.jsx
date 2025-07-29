import React from "react";
import LoginForm from "../components/LoginForm";
import { Col, Container, Row } from "react-bootstrap";

const Login = () => {
  return (
    <Container>
      <Row className="py-5 rounded-5 justify-content-center">
        <Col xs={12} lg={4}>
          {/* Login FORM */}
          <LoginForm />
        </Col>
        {/* <Col lg={6}>
          <div>
            <h1>Login HERE</h1>
          </div>
        </Col> */}
      </Row>
    </Container>
  );
};

export default Login;
