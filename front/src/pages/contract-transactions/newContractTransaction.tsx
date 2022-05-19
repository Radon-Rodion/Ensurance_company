import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./contractTransaction.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { postContractTransactionRequest } from "@/api/createRequests/createRequests";

const NewContractTransaction = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [contract, setContract] = useState("");
  const [transaction, setTransaction] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    postContractTransactionRequest(+contract, +transaction, setSuccess);
  };

  if (success) return <Navigate to="/contract-transactions" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.contract_transactions}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="contract">
          <Form.Label>{localisation.contractId}</Form.Label>
          <Form.Control required type="number" value={contract} onChange={createChangeProcessor(setContract)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="transaction">
          <Form.Label>{localisation.transactionId}</Form.Label>
          <Form.Control required value={transaction} onChange={createChangeProcessor(setTransaction)} />
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

export default NewContractTransaction;
