import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import "./ensuranceRequest.scss";
import createChangeProcessor from "@/api/functionGenerator";
import { postEnsuranceRequestRequest } from "@/api/createRequests/createRequests";

export interface INewEnsuranceRequest {
  contractId: number;
  comment: string;
  photo: string;
  status: string;
}
const NewEnsuranceRequest = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);

  const [validated, setValidated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [ensuranceRequest, setEnsuranceRequest] = useState<INewEnsuranceRequest>({
    contractId: -1,
    comment: "",
    photo: "",
    status: "",
  });

  const setContract = (contract: string) => {
    setEnsuranceRequest({ ...ensuranceRequest, contractId: +contract });
  };
  const setComment = (comment: string) => {
    setEnsuranceRequest({ ...ensuranceRequest, comment });
  };
  const setPhoto = (photo: string) => {
    setEnsuranceRequest({ ...ensuranceRequest, photo });
  };
  const setStatus = (status: string) => {
    setEnsuranceRequest({ ...ensuranceRequest, status });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    postEnsuranceRequestRequest(
      ensuranceRequest.contractId,
      ensuranceRequest.comment,
      ensuranceRequest.photo,
      ensuranceRequest.status,
      setSuccess
    );
  };

  if (success) return <Navigate to="/ensuranceRequests" />;

  return (
    <div className="background">
      <h2 className="title">{localisation.register}</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
        <Form.Group controlId="contract">
          <Form.Label>{localisation.contractId}</Form.Label>
          <Form.Control required value={ensuranceRequest.contractId} onChange={createChangeProcessor(setContract)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="comment">
          <Form.Label>{localisation.comment}</Form.Label>
          <Form.Control required value={ensuranceRequest.comment} onChange={createChangeProcessor(setComment)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="photo">
          <Form.Label>{localisation.photo}</Form.Label>
          <Form.Control required value={ensuranceRequest.photo} onChange={createChangeProcessor(setPhoto)} />
          <Form.Control.Feedback type="invalid">{localisation.invalidEnter}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>{localisation.status}</Form.Label>
          <Form.Control required value={ensuranceRequest.status} onChange={createChangeProcessor(setStatus)} />
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

export default NewEnsuranceRequest;
