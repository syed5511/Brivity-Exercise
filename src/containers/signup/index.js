import React, { useState, useContext } from "react";
import { Form, Button, Container, PageHeader } from "react-bootstrap";
import { signUp } from "../../services/Auth";
import { AuthContext } from "../../ContextAPI/AuthContext";
import { useNavigate } from "react-router-dom";

import "./index.css";

function Signup(props) {
  const authContextProps = useContext(AuthContext);
  let navigate = useNavigate();

  const { userInfo, setUserInfo } = authContextProps;
  const [initialState, setState] = useState({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });
  //Using higher order function
  const onChangeHandler = (key) => (event) => {
    setState({ ...initialState, [key]: event.target.value }); //{key: }
  };

  const onSignUp = (e) => {
    e.preventDefault();

    const { email, displayName, password, confirmPassword } = initialState;
    // "user": {"email": "abc@123.com", "password": "super-secret", "display_name": "Superman"}
    const payload = {
      user: { email: email, password: password, display_name: displayName },
    };
    signUp(payload, setUserInfo, navigate);
  };
  const onSignIn = (e) => {
    navigate("/signin");
  };
  return (
    <div className="sign-up">
      <Container>
        <Form>
          <h3>Create Account</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => onChangeHandler("email")(event)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDisplayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Name"
              onChange={onChangeHandler("displayName")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={onChangeHandler("password")}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={onSignUp}>
            SignUp
          </Button>
          <br />
          <Button variant="primary" type="submit" onClick={onSignIn}>
            SignIn
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Signup;
