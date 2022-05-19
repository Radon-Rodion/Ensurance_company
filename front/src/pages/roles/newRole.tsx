import { Form, Button, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./role.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { postRoleRequest } from "@/api/createRequests/createRequests";

const NewProposal = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    postRoleRequest(name, setSuccess);
  };

  if (success) return <Navigate to="/roles" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.roles}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group as={Col} md="4" controlId="name">
          <Form.Label>{localisation.name}</Form.Label>
          <Form.Control required value={name} onChange={createChangeProcessor(setName)} />
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

export default NewProposal;
