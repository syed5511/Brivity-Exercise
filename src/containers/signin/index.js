import React, { useState, useContext } from "react";
import { Alert, Form, Button, Container, PageHeader } from "react-bootstrap";
import { AuthContext } from "../../ContextAPI/AuthContext";
import { signIn } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Signin() {
  const authContextProps = useContext(AuthContext);
  const { userInfo, setUserInfo } = authContextProps;
  let navigate = useNavigate();

  const [initialState, setState] = useState({ email: "", password: "" });

  const onChangeHandler = (key) => (event) => {
    setState({ ...initialState, [key]: event.target.value }); //{key: }
  };

  const onSignIn = (e) => {
    e.preventDefault();
    const { email, password } = initialState;

    const payLoad = { user: { email: email, password: password } };

    signIn(payLoad, setUserInfo, navigate);
  };
 const onSignUp = (e) => {
  e.preventDefault();
  navigate('/')
 }
  return (
    <div className="sign-up">
      <Container>
        <Form>
          <h3>Sign In</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={onChangeHandler("email")}
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

          <Button variant="primary" type="submit" onClick={onSignIn}>
            Sign In
          </Button>
          <Button variant="primary" type="submit" onClick={onSignUp}>
            Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Signin;
