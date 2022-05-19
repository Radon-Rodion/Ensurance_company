/* eslint-disable camelcase */
import axios from "axios";
import { Dispatch } from "redux";
import localhost from "@/data/localhost";
import User from "@/redux/types/user";
import { setUserAction } from "@/redux/actionCreators/userActionsCreator";

export function postProposalRequest(
  proposal_name: string,
  description: string,
  responseMethod: (success: boolean) => void
) {
  axios
    .post(`${localhost}/proposal`, { proposal_name, description })
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect name or description!");
    });
}

export function postCatalogueRequest(id: number, price_per_year: number, responseMethod: (success: boolean) => void) {
  axios
    .post(`${localhost}/catalogue`, { id, price_per_year })
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect id or price!");
    });
}

export function postRoleRequest(role_name: string, responseMethod: (success: boolean) => void) {
  axios
    .post(`${localhost}/roles`, { role_name })
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect name!");
    });
}

export function postTransactionRequest(
  transaction_sum: number,
  sender_bank_number: string,
  reciever_bank_number: string,
  responseMethod: (transactionId: number) => void
) {
  axios
    .post(`${localhost}/transactions`, { transaction_sum, sender_bank_number, reciever_bank_number })
    .then((response) => {
      console.log(response.data);
      responseMethod(response.data.transaction_id);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect sum, sender or reciever!");
    });
}

export function postContractTransactionRequest(
  contract_id: number,
  transaction_id: number,
  responseMethod: (success: boolean) => void
) {
  axios
    .post(`${localhost}/contract-transactions`, { contract_id, transaction_id })
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect contract or transaction!");
    });
}

export function postUserRequest(
  first_name: string,
  last_name: string,
  passwordHash: string,
  email: string,
  passportNumber: string,
  phone_number: string,
  bank_number: string,
  role_id: number,
  status: string,
  responseMethod: (res: boolean) => void,
  dispatch: Dispatch
) {
  axios
    .post(`${localhost}/users`, {
      first_name,
      last_name,
      passwordHash,
      email,
      passportNumber,
      phone_number,
      bank_number,
      role_id,
      status,
    })
    .then((response) => {
      const userInfo: User = {
        id: response.data.user_id,
        name: response.data.first_name,
        token: undefined,
        isAdmin: response.data.role_id === 1,
      };
      dispatch(setUserAction(userInfo));
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect data!");
    });
}

export function postSelectedRequest(catalogue_id: number, user_id: number, responseMethod: (success: boolean) => void) {
  axios
    .post(`${localhost}/selected`, { catalogue_id, user_id })
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect user or proposal id!");
    });
}

export function postContractRequest(catalogue_id: number, user_id: number, responseMethod: (success: boolean) => void) {
  axios
    .post(`${localhost}/contracts`, { catalogue_id, user_id })
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect user or proposal id!");
    });
}

export function postEnsuranceRequestRequest(
  contract_id: number,
  user_comment: string,
  photo_approvement: string,
  status: string,
  responseMethod: (success: boolean) => void
) {
  axios
    .post(`${localhost}/ensurance-requests`, { contract_id, user_comment, photo_approvement, status })
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect ensurance request info!");
    });
}
