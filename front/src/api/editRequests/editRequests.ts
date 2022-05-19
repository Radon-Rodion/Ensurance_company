/* eslint-disable import/no-cycle,@typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment */
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

export function putProposalRequest(proposal: Proposal, responseMethod: (success: boolean) => void) {
  axios
    .put(`${localhost}/proposal`, proposal)
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect data!");
    });
}

export function putRoleRequest(role: Role, responseMethod: (success: boolean) => void) {
  axios
    .put(`${localhost}/roles`, role)
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect data!");
    });
}

export function putTransactionRequest(transaction: Transaction, responseMethod: (success: boolean) => void) {
  axios
    .put(`${localhost}/transactions`, transaction)
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect data!");
    });
}

export function putContractTransactionRequest(
  contractTransaction: ContractTransaction,
  responseMethod: (success: boolean) => void
) {
  axios
    .put(`${localhost}/contract-transactions`, contractTransaction)
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect data!");
    });
}

export function putUserRequest(user: User, responseMethod: (success: boolean) => void) {
  axios
    .put(`${localhost}/users`, user)
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect data!");
    });
}

export function putCatalogueRequest(catalogue: Catalogue, responseMethod: (success: boolean) => void) {
  axios
    .put(`${localhost}/catalogue`, catalogue)
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect data!");
    });
}

export function putContractRequest(contract: Contract, responseMethod: (success: boolean) => void) {
  axios
    .put(`${localhost}/contracts`, contract)
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect data!");
    });
}

export function putEnsuranceRequestRequest(request: EnsuranceRequest, responseMethod: (success: boolean) => void) {
  axios
    .put(`${localhost}/ensurance-requests`, request)
    .then((response) => {
      responseMethod(true);
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect data!");
    });
}
