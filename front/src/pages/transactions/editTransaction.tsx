/* eslint-disable camelcase,import/no-cycle */
import { Form, Button } from "react-bootstrap";
import {  useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./transaction.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { getTransactionRequest } from "@/api/singleGetRequests/singleGetRequests";
import { putTransactionRequest } from "@/api/editRequests/editRequests";

export interface Transaction {
  transaction_id: number;
  transaction_sum: number;
  transaction_date: string;
  sender_bank_number: string;
  reciever_bank_number: string;
}

const EditTransaction = () => {
  const params = useParams();

  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>({
    transaction_id: -1,
    transaction_sum: 0,
    sender_bank_number: "",
    reciever_bank_number: "",
    transaction_date: "",
  });

  if (transaction.transaction_id === -1) {
    getTransactionRequest(+params.id, setTransaction);
  }

  const setSum = (transaction_sum: string) => {
    setTransaction({ ...transaction, transaction_sum: +transaction_sum });
  };
  const setSender = (sender_bank_number: string) => {
    setTransaction({ ...transaction, sender_bank_number });
  };
  const setReciever = (reciever_bank_number: string) => {
    setTransaction({ ...transaction, reciever_bank_number });
  };


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    putTransactionRequest(transaction, setSuccess);
  };

  if (success) return <Navigate to="/transaction" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.transactions}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="id">
          <Form.Label>Id: </Form.Label>
          <Form.Label>{transaction.transaction_id}</Form.Label>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>{localisation.date}</Form.Label>
          <Form.Label>{transaction.transaction_date}</Form.Label>
        </Form.Group>
        <Form.Group controlId="sum">
          <Form.Label>{localisation.sum}</Form.Label>
          <Form.Control required value={transaction.transaction_sum} onChange={createChangeProcessor(setSum)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="sender">
          <Form.Label>{localisation.sender}</Form.Label>
          <Form.Control required value={transaction.sender_bank_number} onChange={createChangeProcessor(setSender)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="reciever">
          <Form.Label>{localisation.reciever}</Form.Label>
          <Form.Control required value={transaction.reciever_bank_number} onChange={createChangeProcessor(setReciever)}/>
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

export default EditTransaction;
