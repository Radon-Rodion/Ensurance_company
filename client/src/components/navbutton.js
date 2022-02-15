import { NavLink } from "react-router-dom";

const NavButton = (props) => {
    return (
        <NavLink to={props.to}>{props.name}</NavLink>
    );
}
export default NavButton;