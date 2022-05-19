/* eslint-disable */
import axios from "axios";
import localhost from "@/data/localhost";
import { Proposal } from "@/pages/proposal/editProposal";
import { Role } from "@/pages/roles/editRole";
import { Transaction } from "@/pages/transactions/editTransaction";
import { ContractTransaction } from "@/pages/contract-transactions/editContractTransaction";
import { User } from "@/pages/users/editUser";
import { Catalogue } from "@/pages/catalogue/editCatalogue";
import { Contract } from "@/pages/contracts/editContract";
import { EnsuranceRequest } from "@/pages/ensurance-requests/editEnsuranceRequest";

export function getProposalRequest(id: number, responseMethod: (proposal: Proposal) => void) {
  axios
    .get(`${localhost}/proposal/${id}`)
    .then((response) => {
      console.log(response.data);
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get proposal with such id!");
    });
}

export function getRoleRequest(id: number, responseMethod: (role: Role) => void) {
  axios
    .get(`${localhost}/roles/${id}`)
    .then((response) => {
      console.log(response.data);
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get role with such id!");
    });
}

export function getTransactionRequest(id: number, responseMethod: (transaction: Transaction) => void) {
  axios
    .get(`${localhost}/transactions/${id}`)
    .then((response) => {
      console.log(response.data);
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get transaction with such id!");
    });
}

export function getContractTransactionRequest(id: number, responseMethod: (contractTransaction: ContractTransaction) => void) {
  axios
    .get(`${localhost}/contract-transactions/${id}`)
    .then((response) => {
      console.log(response.data);
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get contract-transaction with such id!");
    });
}

export function getUserRequest(id: number, responseMethod: (user: User) => void) {
  axios
    .get(`${localhost}/users/${id}`)
    .then((response) => {
      console.log(response.data);
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get user with such id!");
    });
}

export function getCatalogueRequest(id: number, responseMethod: (catalogue: Catalogue) => void) {
  axios
    .get(`${localhost}/catalogue/${id}`)
    .then((response) => {
      console.log(response.data);
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get catalogue proposal with such id!");
    });
}

export function getContractRequest(id: number, responseMethod: (contract: Contract) => void) {
  axios
    .get(`${localhost}/contracts/${id}`)
    .then((response) => {
      console.log(response.data);
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get contract with such id!");
    });
}

export function getEnsuranceRequestRequest(id: number, responseMethod: (request: EnsuranceRequest) => void) {
  axios
    .get(`${localhost}/ensurance-requests/${id}`)
    .then((response) => {
      console.log(response.data);
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get ensurance request with such id!");
    });
}
