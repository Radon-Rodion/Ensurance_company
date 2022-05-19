import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./transaction.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { postTransactionRequest, postContractTransactionRequest } from "@/api/createRequests/createRequests";

const NewTransaction = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [sum, setSum] = useState("");
  const [sender, setSender] = useState("");
  const [reciever, setReciever] = useState("");
  const [contract, setContract] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const successAction = (transactionId: number) => {
      if (contract.length) postContractTransactionRequest(+contract, transactionId, setSuccess);
      else setSuccess(true);
    };

    postTransactionRequest(+sum, sender, reciever, successAction);
  };

  if (success) return <Navigate to="/transactions" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.transactions}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="sum">
          <Form.Label>{localisation.sum}</Form.Label>
          <Form.Control required type="number" value={sum} onChange={createChangeProcessor(setSum)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="sender">
          <Form.Label>{localisation.sender}</Form.Label>
          <Form.Control required value={sender} onChange={createChangeProcessor(setSender)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="reciever">
          <Form.Label>{localisation.reciever}</Form.Label>
          <Form.Control required value={reciever} onChange={createChangeProcessor(setReciever)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="contract">
          <Form.Label>{localisation.contractId}</Form.Label>
          <Form.Control type="number" value={contract} onChange={createChangeProcessor(setContract)} />
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

export default NewTransaction;
