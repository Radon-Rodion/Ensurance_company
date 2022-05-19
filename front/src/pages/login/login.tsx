import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./login.scss";
import { resetUserAction } from "@/redux/actionCreators/userActionsCreator";
import createChangeProcessor from "@/api/functionGenerator";
import { loginRequest } from "@/api/loginRequest";

const LoginPage = () => {
  resetUserAction();

  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [success, setSuccess] = useState(false);
  const [register, setRegister] = useState(false);
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  dispatch(resetUserAction());

  if (register) return <Navigate to="/register" />;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    loginRequest(email, password, setSuccess, dispatch);
  };

  if (success) return <Navigate to="/catalogue" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.signIn}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group as={Col} md="4" controlId="email">
          <Form.Label>{localisation.email}</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={createChangeProcessor(setEmail)}
          />
          <Form.Control.Feedback type="invalid">{localisation.emailInvalid}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="password">
          <Form.Label>{localisation.password}</Form.Label>
          <Form.Control
            required
            type="password"
            pattern="^[a-zA-Z0-9_]{8,16}$"
            value={password}
            onChange={createChangeProcessor(setPassword)}
          />
          <Form.Control.Feedback type="invalid">{localisation.passwordInvalid}</Form.Control.Feedback>
        </Form.Group>
        <div className="buttons">
          <Button variant="primary" type="submit">
            {localisation.signIn}
          </Button>{" "}
          <Button variant="secondary" type="button" onClick={() => setRegister(true)}>
            {localisation.signUp}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
