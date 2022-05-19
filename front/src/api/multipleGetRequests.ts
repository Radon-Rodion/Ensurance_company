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

export function getProposalsListRequest(responseMethod: (proposalsList: Array<Proposal>) => void) {
  axios
    .get(`${localhost}/proposal`)
    .then((response) => {
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get proposals!");
    });
}

export function getRolesListRequest(responseMethod: (rolesList: Array<Role>) => void) {
  axios
    .get(`${localhost}/roles`)
    .then((response) => {
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get roles!");
    });
}

export function getTransactionsListRequest(responseMethod: (transactionsList: Array<Transaction>) => void) {
  axios
    .get(`${localhost}/transactions`)
    .then((response) => {
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get transactions!");
    });
}

export function getContractTransactionsListRequest(
  responseMethod: (contractTransactionsList: Array<ContractTransaction>) => void
) {
  axios
    .get(`${localhost}/contract-transactions`)
    .then((response) => {
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get contract-transactions!");
    });
}

export function getUsersListRequest(responseMethod: (usersList: Array<User>) => void) {
  axios
    .get(`${localhost}/users`)
    .then((response) => {
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get users!");
    });
}

export function getCatalogueListRequest(responseMethod: (catalogueList: Array<Catalogue>) => void) {
  axios
    .get(`${localhost}/catalogue`)
    .then((response) => {
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get catalogue!");
    });
}

export function getContractsListRequest(responseMethod: (contractsList: Array<Contract>) => void) {
  axios
    .get(`${localhost}/contracts`)
    .then((response) => {
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get contracts!");
    });
}

export function getEnsuranceRequestsListRequest(
  responseMethod: (ensuranceRequestsList: Array<EnsuranceRequest>) => void
) {
  axios
    .get(`${localhost}/ensurance-requests`)
    .then((response) => {
      responseMethod(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Can not get ensurance requests!");
    });
}
