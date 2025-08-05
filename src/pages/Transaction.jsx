import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdAutoDelete,
  MdEditSquare,
  MdOutlineAddCircleOutline,
} from "react-icons/md";
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
import {
  fetchTransactions,
  removeTransaction,
} from "../features/transactions/transactionAction.js";

const Transaction = () => {
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
  const refreshTransactions = () => {
    dispatch(fetchTransactions());
  };
  const dispatch = useDispatch();
  const { transactions } = useSelector((store) => store.transactionStore);

  // const fetchTransaction = async () => {
  //   // fetch the token from localstorage
  //   let data = await getTransation();

  //   console.log(data);
  //   dispatch(setTransactions(data.transactions));

  //   let tempTotal = data.transactions.reduce((acc, item) => {
  //     return item.type == "income"
  //       ? acc + parseFloat(item.amount)
  //       : acc - parseFloat(item.amount);
  //   }, 0);

  //   console.log(tempTotal);
  //   setTotal(tempTotal);
  // };

  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect(() => {
    setTotal(
      transactions.reduce(
        (acc, item) =>
          item.type == "income" ? acc + item.amount : acc - item.amount,
        0
      )
    );
  }, [transactions]);

  useEffect(() => {
    refreshTransactions(); // Load on mount
  }, []);

  const handleOnDelete = async (id, isMany) => {
    if (!window.confirm("Are you sure you want to delete these transactions?"))
      return;

    const toDeleteData = isMany ? idsToDelete : [id];
    let data = await dispatch(removeTransaction(toDeleteData));

    if (data.status) {
      toast.success(data.message);
      setIdsToDelete([]); // Clear selection after successful deletion
    } else {
      toast.error(data.message);
    }
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    // Handle to select all the checkboxes
    if (value === "all") {
      // Get all the ids from transactions
      checked
        ? setIdsToDelete(transactions.map((t) => t._id))
        : setIdsToDelete([]);

      // Set it to idsToDelete
      return;
    }

    if (checked) {
      // Check for the duplicate ids
      setIdsToDelete([...idsToDelete, value]);
    } else {
      // Remove the ids from the array
      setIdsToDelete(idsToDelete.filter((ti) => ti !== value));
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
                    <Form.Check
                      type="checkbox"
                      value="all"
                      onChange={handleOnSelect}
                      checked={
                        transactions.length === idsToDelete.length &&
                        transactions.length > 0
                      }
                    />
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
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      There are currently no transactions to display.
                    </td>
                  </tr>
                ) : (
                  <>
                    {transactions.map((t, index) => {
                      return (
                        <tr key={t._id}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              value={t._id}
                              onChange={handleOnSelect}
                              checked={idsToDelete.includes(t._id)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{t.date.split("T")[0]}</td>
                          <td className="text-capitalize">{t.description}</td>
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
                      <td colSpan={7}>Total : ${total}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
            {idsToDelete.length > 0 && (
              <div className="d-grid">
                <Button
                  variant="danger"
                  onClick={() => handleOnDelete(null, true)}
                >
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
            fetchTransactions={refreshTransactions}
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
