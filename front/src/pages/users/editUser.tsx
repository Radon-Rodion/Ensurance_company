/* eslint-disable camelcase,import/no-cycle */
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./user.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { getUserRequest } from "@/api/singleGetRequests/singleGetRequests";
import { putUserRequest } from "@/api/editRequests/editRequests";

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  passportNumber: string;
  phone_number: string;
  bank_number: string;
  roleRoleId: number;
  status: string;
}

const EditUser = () => {
  const params = useParams();

  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<User>({
    user_id: -1,
    first_name: "",
    last_name: "",
    email: "",
    passportNumber: "",
    phone_number: "",
    bank_number: "",
    roleRoleId: -1,
    status: "",
  });

  const setFirstName = (firstName: string) => {
    setUser({ ...user, first_name: firstName });
  };
  const setLastName = (lastName: string) => {
    setUser({ ...user, last_name: lastName });
  };
  const setEmail = (email: string) => {
    setUser({ ...user, email });
  };
  const setPassport = (passportNumber: string) => {
    setUser({ ...user, passportNumber });
  };
  const setPhone = (phoneNumber: string) => {
    setUser({ ...user, phone_number: phoneNumber });
  };
  const setBank = (bankNumber: string) => {
    setUser({ ...user, bank_number: bankNumber });
  };
  const setRole = (role: string) => {
    setUser({ ...user, roleRoleId: +role });
  };
  const setStatus = (status: string) => {
    setUser({ ...user, status });
  };

  if (user.user_id === -1) {
    getUserRequest(+params.id, setUser);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    putUserRequest(user, setSuccess);
  };

  if (success) return <Navigate to="/user" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.users}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="id">
          <Form.Label>Id: </Form.Label>
          <Form.Label>{user.user_id}</Form.Label>
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>{localisation.firstName}</Form.Label>
          <Form.Control required value={user.first_name} onChange={createChangeProcessor(setFirstName)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>{localisation.lastName}</Form.Label>
          <Form.Control required value={user.last_name} onChange={createChangeProcessor(setLastName)} />
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
          <Form.Control required value={user.bank_number} onChange={createChangeProcessor(setBank)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>{localisation.phoneNumber}</Form.Label>
          <Form.Control required value={user.phone_number} onChange={createChangeProcessor(setPhone)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="role">
          <Form.Label>{localisation.roleId}</Form.Label>
          <Form.Control required type="number" value={user.roleRoleId} onChange={createChangeProcessor(setRole)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>{localisation.status}</Form.Label>
          <Form.Control required value={user.status} onChange={createChangeProcessor(setStatus)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>

        <div className="buttons">
          <Button type="submit">{localisation.enter}</Button>
          <Button type="button" variant="secondary" onClick={() => setSuccess(true)}>
            {localisation.cancel}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditUser;
