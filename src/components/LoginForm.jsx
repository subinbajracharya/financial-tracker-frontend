import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import { loginUser } from "../utils/axiosHelper";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { FaChartLine } from "react-icons/fa";
import { Nav } from "react-bootstrap";

const LoginForm = () => {
  const { setUser, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("LOGIN LOCATION", location);

  let initialState = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);

  // const [customValue, setCustomValue] = useState("");

  let inputFields = [
    {
      id: "email",
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
      value: form.email,
    },
    {
      id: "password",
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      value: form.password,
    },
  ];

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // alert("Form submitted");

    // make a create user post request
    // axios call
    // {username, email, password}

    let data = await loginUser(form);
    console.log("response from login user", data);

    // if success go to login form
    // else do nothing
    if (data.status) {
      toast.success(data.message);
      // navigate("/transaction");

      // when logged in set the user data from the response in the user Context
      setUser(data.user);

      // store accessToken to localStorage
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      toast.error(data.message);
    }
  };

  const handleOnChange = (event) => {
    let tempForm = { ...form };
    tempForm[event.target.name] = event.target.value;
    setForm(tempForm);
  };

  const pastLocation = location?.state?.from?.pathname || "/transaction";

  useEffect(() => {
    user?._id && navigate(pastLocation);
  }, [user?._id]);

  return (
    <div className="border border-white border-lg p-5 rounded rounded-5">
      <div className="text-center">
        <FaChartLine size="60" />
        <h1>Financial Tracker</h1>
        <p>Spend mindfully, save effortlessly.</p>
      </div>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {inputFields.map((item) => {
          return <CustomInput {...item} onChange={handleOnChange} />;
        })}

        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" type="submit">
            Log In
          </Button>
          <Link to="/signup" className="text-white">
            Signup?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
