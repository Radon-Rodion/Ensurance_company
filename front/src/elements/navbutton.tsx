import { NavLink } from "react-router-dom";

interface INavButtonProps {
  to: string;
  name: string;
}

const NavButton = (props: INavButtonProps) => <NavLink to={props.to}>{props.name}</NavLink>;
export default NavButton;
