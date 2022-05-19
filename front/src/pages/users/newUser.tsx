import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./user.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { postUserRequest } from "@/api/createRequests/createRequests";
import { hashCode } from "@/api/functions";
import Navbutton from "@/elements/navbutton";

export interface INewUser {
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeat: string;
  email: string;
  passportNumber: string;
  phoneNumber: string;
  bankNumber: string;
  roleId: number;
  status: string;
}
const NewUser = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<INewUser>({
    firstName: "",
    lastName: "",
    password: "",
    passwordRepeat: "",
    email: "",
    passportNumber: "",
    phoneNumber: "",
    bankNumber: "",
    roleId: -1,
    status: "",
  });

  const setFirstName = (firstName: string) => {
    setUser({ ...user, firstName });
  };
  const setLastName = (lastName: string) => {
    setUser({ ...user, lastName });
  };
  const setPassword = (password: string) => {
    setUser({ ...user, password });
  };
  const setPasswordRepeat = (passwordRepeat: string) => {
    setUser({ ...user, passwordRepeat });
  };
  const setEmail = (email: string) => {
    setUser({ ...user, email });
  };
  const setPassport = (passportNumber: string) => {
    setUser({ ...user, passportNumber });
  };
  const setPhone = (phoneNumber: string) => {
    setUser({ ...user, phoneNumber });
  };
  const setBank = (bankNumber: string) => {
    setUser({ ...user, bankNumber });
  };
  const setRole = (role: string) => {
    setUser({ ...user, roleId: +role });
  };
  const setStatus = (status: string) => {
    setUser({ ...user, status });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (user.password === user.passwordRepeat) {
      setValidated(true);

      postUserRequest(
        user.firstName,
        user.lastName,
        hashCode(user.password),
        user.email,
        user.passportNumber,
        user.phoneNumber,
        user.bankNumber,
        user.roleId,
        user.status,
        setSuccess,
        dispatch
      );
    } else setValidated(false);
  };

  if (success) return <Navigate to="/users" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.register}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="firstName">
          <Form.Label>{localisation.firstName}</Form.Label>
          <Form.Control required value={user.firstName} onChange={createChangeProcessor(setFirstName)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>{localisation.lastName}</Form.Label>
          <Form.Control required value={user.lastName} onChange={createChangeProcessor(setLastName)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>{localisation.password}</Form.Label>
          <Form.Control required type="password" value={user.password} onChange={createChangeProcessor(setPassword)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="passwordRepeat">
          <Form.Label>{localisation.passwordRepeat}</Form.Label>
          <Form.Control
            required
            type="password"
            value={user.passwordRepeat}
            onChange={createChangeProcessor(setPasswordRepeat)}
          />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>{localisation.email}</Form.Label>
          <Form.Control required type="email" value={user.email} onChange={createChangeProcessor(setEmail)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="passportNumber">
          <Form.Label>{localisation.passportNumber}</Form.Label>
          <Form.Control required value={user.passportNumber} onChange={createChangeProcessor(setPassport)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="bankNumber">
          <Form.Label>{localisation.bankNumber}</Form.Label>
          <Form.Control required value={user.bankNumber} onChange={createChangeProcessor(setBank)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>{localisation.phoneNumber}</Form.Label>
          <Form.Control required value={user.phoneNumber} onChange={createChangeProcessor(setPhone)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="role">
          <Form.Label>{localisation.roleId}</Form.Label>
          <Form.Control required type="number" value={user.roleId} onChange={createChangeProcessor(setRole)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>{localisation.status}</Form.Label>
          <Form.Control required value={user.status} onChange={createChangeProcessor(setStatus)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>

        <div className="buttons">
          <Button type="submit">{localisation.enter}</Button>
          <Navbutton to="/login" name={localisation.cancel} />
        </div>
      </Form>
    </div>
  );
};

export default NewUser;
