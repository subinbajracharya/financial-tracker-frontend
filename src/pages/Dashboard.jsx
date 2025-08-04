import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { Col, Container, Row, Table } from "react-bootstrap";
import { getDashboardMetrics } from "../utils/axiosHelper";
import { MdAccountBalance, MdSavings } from "react-icons/md";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";

const Dashboard = () => {
  const { testFunction, user } = useUser();

  const [dashboardObject, setDashboardObject] = useState({
    balance: 1000,
    income: 100,
    expense: 200,
    transaction_no: 100,
    activities: [
      {
        description: "Salary",
        amount: 100,
        date: "23",
        type: "income",
      },
    ],
  });

  const fetchDashboardMetric = async () => {
    let data = await getDashboardMetrics();

    if (data.status) {
      console.log("DATA: ", data.metrics);
      setDashboardObject(data.metrics);
    }
  };

  useEffect(() => {
    console.log(testFunction());

    fetchDashboardMetric();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <h3 className="text-capitalize">Welcome, {user.username}</h3>
        <Col xs="12" md="4">
          <div className="d-flex flex-column rounded bg-success p-4">
            <h3 className="d-flex align-items-center">
              <MdAccountBalance size="52" className="me-2" />
              Balance
            </h3>
            <hr />
            <strong className="fs-1">{dashboardObject?.balance}</strong>
          </div>
        </Col>
        <Col xs="12" md="4">
          <div className="d-flex flex-column rounded bg-warning p-4">
            <h3 className="d-flex align-items-center">
              <GiReceiveMoney size="52" className="me-2" />
              Income
            </h3>
            <hr />
            <strong className="fs-1">{dashboardObject.income}</strong>
          </div>
        </Col>
        <Col xs="12" md="4">
          <div className="d-flex flex-column rounded bg-danger p-4">
            <h3 className="d-flex align-items-center">
              <GiPayMoney size="52" className="me-2" />
              Expense
            </h3>
            <hr />
            <strong className="fs-1">{dashboardObject.expense}</strong>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {/* <Col xs="3" md="4">
          <div className="p-4 d-flex flex-column rounded bg-primary">
            <h3>No of Transaction</h3>
            <hr />
            <strong className="fs-1">{dashboardObject?.transaction_no}</strong>
          </div>
        </Col> */}
        <Col xs="12">
          <div className="d-flex flex-column rounded text-white">
            <h3>Cash Flow Summary</h3>
            <hr />
            {/* <strong className="fs-4">
              Description: {dashboardObject?.last_transaction?.description}
            </strong>
            <br />
            <strong className="fs-4">
              Amount: {dashboardObject?.last_transaction?.amount}
            </strong>
            <br />
            <strong className="fs-4">
              Date: {dashboardObject?.last_transaction?.date}
            </strong>
            <br />
            <strong className="fs-4">
              Type: {dashboardObject?.last_transaction?.type}
            </strong> */}
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {dashboardObject.activities.map((item, i) => {
                  console.log("ITEM:", item);
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.description}</td>
                      <td
                        className={
                          item.type == "income"
                            ? "text-success"
                            : item.type == "expense"
                            ? "text-danger"
                            : ""
                        }
                      >
                        ${item.amount}
                      </td>
                      <td>{item.date.split("T")[0]}</td>
                      <td>{item.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
