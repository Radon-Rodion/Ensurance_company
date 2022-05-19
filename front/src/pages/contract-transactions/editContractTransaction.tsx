/* eslint-disable camelcase,import/no-cycle */
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./contractTransaction.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { getContractTransactionRequest } from "@/api/singleGetRequests/singleGetRequests";
import { putContractTransactionRequest } from "@/api/editRequests/editRequests";

export interface ContractTransaction {
  id: number;
  contractContractId: number;
  transactionTransactionId: number;
}

const EditContractTransaction = () => {
  const params = useParams();

  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [contractTransaction, setContractTransaction] = useState<ContractTransaction>({
    id: -1,
    contractContractId: -1,
    transactionTransactionId: -1,
  });

  if (contractTransaction.id === -1) {
    getContractTransactionRequest(+params.id, setContractTransaction);
  }

  const setContract = (contract_id: string) => {
    setContractTransaction({ ...contractTransaction, contractContractId: +contract_id });
  };
  const setTransaction = (transaction_id: string) => {
    setContractTransaction({ ...contractTransaction, transaction_id: +transaction_id });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    putContractTransactionRequest(contractTransaction, setSuccess);
  };

  if (success) return <Navigate to="/contractTransaction" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.contract_transactions}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="id">
          <Form.Label>Id: </Form.Label>
          <Form.Label>{contractTransaction.id}</Form.Label>
        </Form.Group>
        <Form.Group controlId="contract">
          <Form.Label>{localisation.contractId}</Form.Label>
          <Form.Control
            required
            type="number"
            value={contractTransaction.contractContractId}
            onChange={createChangeProcessor(setContract)}
          />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="transaction">
          <Form.Label>{localisation.transactionId}</Form.Label>
          <Form.Control
            required
            type="number"
            value={contractTransaction.transactionTransactionId}
            onChange={createChangeProcessor(setTransaction)}
          />
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

export default EditContractTransaction;
