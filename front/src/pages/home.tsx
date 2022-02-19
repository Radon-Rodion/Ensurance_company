import NavButton from "../components/navbutton";

const Home = () => (
  <>
    <NavButton to="/proposal" name="proposal" />
    <br />
    <NavButton to="/catalogue" name="catalogue" />
    <br />
    <NavButton to="/selected" name="selected" />
    <br />
    <NavButton to="/contracts" name="contracts" />
    <br />
    <NavButton to="/ensurance-requests" name="ensurance-requests" />
    <br />
    <NavButton to="/users" name="users" />
    <br />
    <NavButton to="/roles" name="roles" />
    <br />
    <NavButton to="/contract-transactions" name="contract-transactions" />
    <br />
    <NavButton to="/transactions" name="transactions" />
    <br />
  </>
);

export default Home;
