/* eslint-disable camelcase,import/no-cycle */
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./ensuranceRequest.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { getEnsuranceRequestRequest } from "@/api/singleGetRequests/singleGetRequests";
import { putEnsuranceRequestRequest } from "@/api/editRequests/editRequests";

export interface EnsuranceRequest {
  id: number;
  contractContractId: number;
  user_comment: string;
  photo_approvement: string;
  request_date: string;
  status: string;
  transactionTransactionId: number;
}

const EditEnsuranceRequest = () => {
  const params = useParams();

  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [ensuranceRequest, setEnsuranceRequest] = useState<EnsuranceRequest>({
    id: -1,
    contractContractId: -1,
    user_comment: "",
    photo_approvement: "",
    request_date: "",
    status: "",
    transactionTransactionId: -1,
  });

  const setContract = (contract: string) => {
    setEnsuranceRequest({ ...ensuranceRequest, contractContractId: +contract });
  };
  const setComment = (comment: string) => {
    setEnsuranceRequest({ ...ensuranceRequest, user_comment: comment });
  };
  const setPhoto = (photo: string) => {
    setEnsuranceRequest({ ...ensuranceRequest, photo_approvement: photo });
  };
  const setStatus = (status: string) => {
    setEnsuranceRequest({ ...ensuranceRequest, status });
  };
  const setTransaction = (transaction: string) => {
    setEnsuranceRequest({ ...ensuranceRequest, transactionTransactionId: +transaction });
  };

  if (ensuranceRequest.id === -1) {
    getEnsuranceRequestRequest(+params.id, setEnsuranceRequest);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    putEnsuranceRequestRequest(ensuranceRequest, setSuccess);
  };

  if (success) return <Navigate to="/ensuranceRequests" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.ensurance_requests}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="id">
          <Form.Label>Id: </Form.Label>
          <Form.Label>{ensuranceRequest.id}</Form.Label>
        </Form.Group>
        <Form.Group controlId="contract">
          <Form.Label>{localisation.contractId}</Form.Label>
          <Form.Control required value={ensuranceRequest.contractContractId} onChange={createChangeProcessor(setContract)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="comment">
          <Form.Label>{localisation.comment}</Form.Label>
          <Form.Control required value={ensuranceRequest.user_comment} onChange={createChangeProcessor(setComment)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="photo">
          <Form.Label>{localisation.photo}</Form.Label>
          <Form.Control
            required
            value={ensuranceRequest.photo_approvement}
            onChange={createChangeProcessor(setPhoto)}
          />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>{localisation.status}</Form.Label>
          <Form.Control required value={ensuranceRequest.status} onChange={createChangeProcessor(setStatus)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="transaction_id">
          <Form.Label>{localisation.transactionId}</Form.Label>
          <Form.Control
            required
            type="number"
            value={ensuranceRequest.transactionTransactionId}
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

export default EditEnsuranceRequest;
