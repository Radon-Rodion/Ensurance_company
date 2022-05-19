import { useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import styles from "./navbar.scss";

const Navbar = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const user = useSelector((state) => (state as RootState).user.info);

  if (user.id < 1) return <div />;

  const allLinks = [
    {
      name: localisation.proposal,
      to: "/proposal",
    },
    {
      name: localisation.catalogue,
      to: "/catalogue",
    },
    {
      name: localisation.contracts,
      to: "/contracts",
    },
    {
      name: localisation.selected,
      to: "/selected",
    },
    {
      name: localisation.users,
      to: "/users",
    },
    {
      name: localisation.roles,
      to: "/roles",
    },
    {
      name: localisation.transactions,
      to: "/transactions",
    },
    {
      name: localisation.contract_transactions,
      to: "/contract-transactions",
    },
    {
      name: localisation.ensurance_requests,
      to: "/ensurance-requests",
    },
    {
      name: localisation.exit,
      to: "/login",
    },
  ];

  const someLinks = [
    {
      name: localisation.catalogue,
      to: "/catalogue",
    },
    {
      name: localisation.contracts,
      to: "/contracts",
    },
    {
      name: localisation.selected,
      to: "/selected",
    },
    {
      name: localisation.users,
      to: `/users/${user.id}`,
    },
    {
      name: localisation.transactions,
      to: "/transactions/new",
    },
    {
      name: localisation.ensurance_requests,
      to: "/ensurance-requests",
    },
    {
      name: localisation.exit,
      to: "/login",
    },
  ];
  const links = user.isAdmin ? allLinks : someLinks;

  return (
    <Accordion className="col-md-4 navbar">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{localisation.menu}</Accordion.Header>
        <Accordion.Body>
          <ul>
            <nav>
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink className={({ isActive }) => (isActive ? "highlight" : "")} to={link.to}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </nav>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Navbar;
