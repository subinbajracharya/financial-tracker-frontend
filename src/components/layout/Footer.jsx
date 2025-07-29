import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid className="py-4 text-white">
      <Row className="text-center">
        <Col>&copy; 2025 Financial Tracker. All rights reserved.</Col>
      </Row>
    </Container>
  );
};

export default Footer;
