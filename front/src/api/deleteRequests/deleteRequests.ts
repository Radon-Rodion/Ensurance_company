/* eslint-disable import/prefer-default-export */

import axios from "axios";
import localhost from "@/data/localhost";

export function deleteProposal(index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${localhost}/proposal/${index}`)
    .then(() => callback())
    .catch((error) => {
      console.error(error);
      alert("Can not delete this proposal!");
    });
}

export function deleteRole(index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${localhost}/roles/${index}`)
    .then(() => callback())
    .catch((error) => {
      console.error(error);
      alert("Can not delete this role!");
    });
}

export function deleteTransaction(index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${localhost}/transactions/${index}`)
    .then(() => callback())
    .catch((error) => {
      console.error(error);
      alert("Can not delete this transaction!");
    });
}

export function deleteContractTransaction(index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${localhost}/contract-transactions/${index}`)
    .then(() => callback())
    .catch((error) => {
      console.error(error);
      alert("Can not delete this contract-transaction!");
    });
}

export function deleteUser(index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${localhost}/users/${index}`)
    .then(() => callback())
    .catch((error) => {
      console.error(error);
      alert("Can not delete this user!");
    });
}

export function deleteCatalogue(index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${localhost}/catalogue/${index}`)
    .then(() => callback())
    .catch((error) => {
      console.error(error);
      alert("Can not delete this catalogue item!");
    });
}

export function deleteContract(index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${localhost}/contracts/${index}`)
    .then(() => callback())
    .catch((error) => {
      console.error(error);
      alert("Can not delete this contract!");
    });
}

export function deleteEnsuranceRequest(index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${localhost}/ensurance-requests/${index}`)
    .then(() => callback())
    .catch((error) => {
      console.error(error);
      alert("Can not delete this ensurance request!");
    });
}

export function deleteSelected(index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${localhost}/selected/${index}`)
    .then(() => callback())
    .catch((error) => {
      console.error(error);
      alert("Can not delete this ensurance request!");
    });
}
