/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import "./styles/main.css";
import "./styles/main.scss";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store/store";
import EditProposal from "@/pages/proposal/editProposal";
import ProposalsList from "@/pages/proposal/proposalsList";
import NewProposal from "@/pages/proposal/newProposal";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import RolesList from "@/pages/roles/rolesList";
import NewRole from "@/pages/roles/newRole";
import EditRole from "@/pages/roles/editRole";
import TransactionsList from "@/pages/transactions/transactionsList";
import NewTransaction from "@/pages/transactions/newTransaction";
import EditTransaction from "@/pages/transactions/editTransaction";
import ContractTransactionsList from "@/pages/contract-transactions/contractTransactionsList";
import NewContractTransaction from "@/pages/contract-transactions/newContractTransaction";
import EditContractTransaction from "@/pages/contract-transactions/editContractTransaction";
import UsersList from "@/pages/users/usersList";
import NewUser from "@/pages/users/newUser";
import EditUser from "@/pages/users/editUser";
import CatalogueList from "@/pages/catalogue/catalogueList";
import EditCatalogue from "@/pages/catalogue/editCatalogue";
import EnsuranceRequestsList from "@/pages/ensurance-requests/ensuranceRequestsList";
import NewEnsuranceRequest from "@/pages/ensurance-requests/newEnsuranceRequest";
import EditEnsuranceRequest from "@/pages/ensurance-requests/editEnsuranceRequest";
import ContractsList from "@/pages/contracts/contractsList";
import EditContract from "@/pages/contracts/editContract";
import LoginPage from "@/pages/login/login";

interface AppProps {
  nothing: boolean;
}

interface AppState {
  hasError: boolean;
}

class App extends Component<AppProps, AppState> {
  ["constructor"]: typeof App;

  render() {
    return (
      <StrictMode>
        <Header />
        <Router>
          <div className="background">
            <div className="row">
              <Navbar />
              <div className="col-md-8">
                <Routes>
                  <Route path="/" element={<CatalogueList />} />
                  <Route path="/proposal">
                    <Route index element={<ProposalsList />} />
                    <Route path="new" element={<NewProposal />} />
                    <Route path=":id" element={<EditProposal />} />
                  </Route>
                  <Route path="/catalogue">
                    <Route index element={<CatalogueList />} />
                    <Route path=":id" element={<EditCatalogue />} />
                  </Route>

                  <Route path="/contracts">
                    <Route index element={<ContractsList />} />
                    <Route path=":id" element={<EditContract />} />
                  </Route>
                  <Route path="/ensurance-requests">
                    <Route index element={<EnsuranceRequestsList />} />
                    <Route path="new" element={<NewEnsuranceRequest />} />
                    <Route path=":id" element={<EditEnsuranceRequest />} />
                  </Route>

                  <Route path="/roles">
                    <Route index element={<RolesList />} />
                    <Route path="new" element={<NewRole />} />
                    <Route path=":id" element={<EditRole />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<UsersList />} />
                    <Route path="new" element={<NewUser />} />
                    <Route path=":id" element={<EditUser />} />
                  </Route>
                  <Route path="/transactions">
                    <Route index element={<TransactionsList />} />
                    <Route path="new" element={<NewTransaction />} />
                    <Route path=":id" element={<EditTransaction />} />
                  </Route>
                  <Route path="/contract-transactions">
                    <Route index element={<ContractTransactionsList />} />
                    <Route path="new" element={<NewContractTransaction />} />
                    <Route path=":id" element={<EditContractTransaction />} />
                  </Route>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<NewUser />} />
                  <Route path="*" element={<Navigate to="/catalogue" />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </StrictMode>
    );
  }
}

ReactDom.render(
  <Provider store={store}>
    <App nothing={false} />
  </Provider>,
  document.getElementById("app")
);
