/* eslint-disable import/no-cycle */
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./contracts.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { getContractRequest } from "@/api/singleGetRequests/singleGetRequests";
import { putContractRequest } from "@/api/editRequests/editRequests";

export interface Contract {
  id: number;
  userUserId: number;
  proposalProposalId: number;
  proposal_name: string;
  request_date: string;
  price_per_year: number;
  status: string;
}

const EditContract = () => {
  const params = useParams();

  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [contract, setContract] = useState<Contract>({
    id: -1,
    userUserId: -1,
    proposalProposalId: -1,
    proposal_name: "",
    status: "",
    request_date: "",
    price_per_year: -1,
  });

  if (contract.id === -1) {
    getContractRequest(+params.id, setContract);
  }

  const setPrice = (price: string) => {
    setContract({ ...contract, real_price: +price });
  };
  const setStatus = (status: string) => {
    setContract({ ...contract, status });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    putContractRequest(contract, setSuccess);
  };

  if (success) return <Navigate to="/contract" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.contracts}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="id">
          <Form.Label>Id: </Form.Label>
          <Form.Label>{contract.id}</Form.Label>
        </Form.Group>
        <Form.Group controlId="proposal_id">
          <Form.Label>{localisation.proposal}</Form.Label>
          <Form.Label>{contract.proposalProposalId}</Form.Label>
        </Form.Group>
        <Form.Group controlId="user_id">
          <Form.Label>{localisation.users}</Form.Label>
          <Form.Label>{contract.id}</Form.Label>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>{localisation.name}</Form.Label>
          <Form.Label>{contract.proposal_name}</Form.Label>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>{localisation.date}</Form.Label>
          <Form.Label>{contract.request_date}</Form.Label>
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>{localisation.status}</Form.Label>
          <Form.Control required value={contract.status} onChange={createChangeProcessor(setStatus)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>{localisation.price}</Form.Label>
          <Form.Control required value={contract.price_per_year} onChange={createChangeProcessor(setPrice)} />
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

export default EditContract;
