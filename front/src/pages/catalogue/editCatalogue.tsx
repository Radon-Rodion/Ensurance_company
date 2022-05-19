/* eslint-disable import/no-cycle */
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./catalogue.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { getCatalogueRequest } from "@/api/singleGetRequests/singleGetRequests";
import { putCatalogueRequest } from "@/api/editRequests/editRequests";
import { postContractRequest, postSelectedRequest } from "@/api/createRequests/createRequests";

export interface Catalogue {
  id: number;
  proposalProposalId: number;
  proposal_name: string;
  description: string;
  addition_date: string;
  price_per_year: number;
}

const EditCatalogue = () => {
  const params = useParams();

  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const user = useSelector((state) => (state as RootState).user.info);
  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [catalogue, setCatalogue] = useState<Catalogue>({
    id: -1,
    proposalProposalId: -1,
    proposal_name: "",
    description: "",
    addition_date: "",
    price_per_year: -1,
  });

  if (catalogue.id === -1) {
    getCatalogueRequest(+params.id, setCatalogue);
  }

  const setPrice = (price: string) => {
    setCatalogue({ ...catalogue, price_per_year: +price });
  };

  const addToSelected = () => {
    postSelectedRequest(catalogue.id, user.id, setSuccess);
  };

  const requireContract = () => {
    postContractRequest(catalogue.id, user.id, setSuccess);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    putCatalogueRequest(catalogue, setSuccess);
  };

  if (success) return <Navigate to="/catalogue" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.catalogue}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="id">
          <Form.Label>Id: </Form.Label><br/>
          <Form.Label>{catalogue.id}</Form.Label>
        </Form.Group>
        <Form.Group controlId="proposal_id">
          <Form.Label>{localisation.proposal}</Form.Label><br/>
          <Form.Label>{catalogue.proposalProposalId}</Form.Label>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>{localisation.name}</Form.Label><br/>
          <Form.Label>{catalogue.proposal_name}</Form.Label>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>{localisation.description}</Form.Label><br/>
          <Form.Label>{catalogue.description}</Form.Label>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>{localisation.date}</Form.Label><br/>
          <Form.Label>{catalogue.addition_date}</Form.Label>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>{localisation.price}</Form.Label>
          <Form.Control required value={catalogue.price_per_year} onChange={createChangeProcessor(setPrice)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>

        <div className="buttons">
          <Button type="submit">{localisation.enter}</Button>
          <Button type="button" variant="secondary" onClick={() => setSuccess(true)}>
            {localisation.cancel}
          </Button>
          <br/>
          <Button type="button" variant="light" onClick={addToSelected}>
            {localisation.addToSelected}
          </Button>
          <Button type="button" variant="light" onClick={requireContract}>
            {localisation.requireContract}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditCatalogue;
