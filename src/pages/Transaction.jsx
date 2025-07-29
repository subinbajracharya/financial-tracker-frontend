import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdAutoDelete,
  MdEditSquare,
  MdOutlineAddCircleOutline,
} from "react-icons/md";
import { deleteTransaction, getTransation } from "../utils/axiosHelper";
import TransactionForm from "../components/TransactionForm";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "../features/transactions/transactionSlice";

const Transaction = () => {
  const { testFunction2, user } = useUser();

  const [show, setShow] = useState(false);

  const { form, setForm, handleOnChange } = useForm({
    type: "income",
    description: "",
    amount: 0,
    date: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [total, setTotal] = useState(0);

  // const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();
  const { transactions } = useSelector((store) => store.transactionStore);

  const fetchTransaction = async () => {
    // fetch the token from localstorage
    let data = await getTransation();

    console.log(data);
    dispatch(setTransactions(data.transactions));

    let tempTotal = data.transactions.reduce((acc, item) => {
      return item.type == "income"
        ? acc + parseFloat(item.amount)
        : acc - parseFloat(item.amount);
    }, 0);

    console.log(tempTotal);
    setTotal(tempTotal);
  };

  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleOnDelete = async (id) => {
    // delete axios
    let data = await deleteTransaction(id);
    if (data.status) {
      toast.success(data.message);
      fetchTransaction();
    } else {
      toast.error(data.message);
    }
  };

  const handleOnSelect = (checked, id) => {
    let tempIds = [...idsToDelete];

    console.log(checked, id);

    if (checked) {
      // Check for the duplicate ids
      tempIds.push(id);
      setIdsToDelete(tempIds);
    } else {
      // Remove the ids from the array
      tempIds = tempIds.filter((ti) => ti != id);
      setIdsToDelete(tempIds);
    }
  };

  // console.log("IDs", idsToDelete);

  return (
    <Container className="p-5">
      <Row>
        <Col>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h1>Transactions</h1>
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={() => {
                  setForm({
                    type: "income",
                    description: "",
                    amount: 0,
                    date: "",
                  });
                  handleShow();
                }}
              >
                <MdOutlineAddCircleOutline className="me-1" /> Add
              </button>
            </div>
            <hr />
            <Table
              hover
              variant="dark"
              className="text-center"
              style={{ backgroundColor: "transparent !important" }}
            >
              <thead>
                <tr>
                  <th>
                    <Form.Check type="checkbox" value="all" />
                  </th>
                  <th>#</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Out</th>
                  <th>In</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, index) => {
                  return (
                    <tr>
                      <td>
                        <Form.Check
                          type="checkbox"
                          onChange={(e) =>
                            handleOnSelect(e.target.checked, t._id)
                          }
                          checked={
                            idsToDelete.find((i) => i === t._id) ? true : false
                          }
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{t.date.split("T")[0]}</td>
                      <td>{t.description}</td>
                      <td className="text-danger">
                        {t.type == "expense" ? "$" + t.amount : ""}
                      </td>
                      <td className="text-success">
                        {t.type == "income" ? "$" + t.amount : ""}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => {
                            handleOnDelete(t._id);
                          }}
                        >
                          <MdAutoDelete /> Delete
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setForm(t);
                            handleShow();
                          }}
                        >
                          <MdEditSquare /> Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={7}>Total : {total}</td>
                </tr>
              </tbody>
            </Table>
            {idsToDelete.length > 0 && (
              <div className="d-grid">
                <Button variant="danger">
                  Delete {idsToDelete.length}{" "}
                  {idsToDelete.length > 1 ? "Transactions" : "Transaction"}
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{form?._id ? "Edit" : "Add"} Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm
            form={form}
            setForm={setForm}
            handleOnChange={handleOnChange}
            fetchTransaction={fetchTransaction}
            handleClose={handleClose}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Container>
  );
};

export default Transaction;
