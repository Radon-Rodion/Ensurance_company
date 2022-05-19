import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./proposal.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { getProposalRequest } from "@/api/singleGetRequests/singleGetRequests";
import { putProposalRequest } from "@/api/editRequests/editRequests";
import { postCatalogueRequest } from "@/api/createRequests/createRequests";

export interface Proposal {
  proposal_id: number;
  proposal_name: string;
  description: string;
}

const EditProposal = () => {
  const params = useParams();

  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [proposal, setProposal] = useState<Proposal>({ proposal_id: -1, proposal_name: "", description: "" });
  const [price, setPrice] = useState(0);

  if (proposal.proposal_id === -1) {
    getProposalRequest(+params.id, setProposal);
  }

  // eslint-disable-next-line camelcase
  const setName = (proposal_name: string) => {
    setProposal({ proposal_id: proposal.proposal_id, description: proposal.description, proposal_name });
  };
  const setDescription = (description: string) => {
    setProposal({ proposal_id: proposal.proposal_id, proposal_name: proposal.proposal_name, description });
  };



  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    putProposalRequest(proposal, setSuccess);
  };

  const addToCatalogue = () => {
    postCatalogueRequest(proposal.proposal_id, +price, setSuccess);
  }

  if (success) return <Navigate to="/proposal" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.proposal}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group as={Col} md="4" controlId="id">
          <Form.Label>Id: </Form.Label>
          <Form.Label>{proposal.proposal_id}</Form.Label>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="name">
          <Form.Label>{localisation.name}</Form.Label>
          <Form.Control required value={proposal.proposal_name} onChange={createChangeProcessor(setName)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="description">
          <Form.Label>{localisation.description}</Form.Label>
          <Form.Control required as="textarea" rows={5} value={proposal.description} onChange={createChangeProcessor(setDescription)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>

        <div className="buttons">
          <Button type="submit">{localisation.enter}</Button>
          <Button type="button" variant="secondary" onClick={() => setSuccess(true)}>
            {localisation.cancel}
          </Button>
        </div>

        <Form.Group as={Col} md="4" controlId="price">
          <Form.Label>{localisation.price}</Form.Label>
          <Form.Control required type="number" value={price} onChange={createChangeProcessor(setPrice)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <div className="buttons">
          <Button type="button" variant="primary" onClick={addToCatalogue}>
            {localisation.addToCatalogue}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProposal;
