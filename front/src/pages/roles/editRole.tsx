/* eslint-disable camelcase,import/no-cycle */
import { Form, Button, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./role.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { getRoleRequest } from "@/api/singleGetRequests/singleGetRequests";
import { putRoleRequest } from "@/api/editRequests/editRequests";

export interface Role {
  role_id: number;
  role_name: string;
}

const EditRole = () => {
  const params = useParams();

  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState<Role>({ role_id: -1, role_name: "" });

  if (role.role_id === -1) {
    getRoleRequest(+params.id, setRole);
  }

  // eslint-disable-next-line camelcase
  const setName = (role_name: string) => {
    setRole({ role_id: role.role_id, role_name });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    putRoleRequest(role, setSuccess);
  };

  if (success) return <Navigate to="/roles" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.roles}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="id">
          <Form.Label>Id: </Form.Label>
          <Form.Label>{role.role_id}</Form.Label>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>{localisation.name}</Form.Label>
          <Form.Control required value={role.role_name} onChange={createChangeProcessor(setName)} />
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

export default EditRole;
