import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <Container>
      <Row className="py-5 rounded-5 justify-content-center">
        {/* <Col xs={12} lg={4}>
          <div>
            <h1>FINANCIAL TRACKER</h1>
          </div>
        </Col> */}
        <Col xs={12} lg={4}>
          {/* SIGNUP FORM */}
          <SignupForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
