import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

interface IDeleteButtonProps {
  onClick: () => void;
}

const DeleteButton = (props: IDeleteButtonProps) => (
  <button type="button" onClick={props.onClick}>
    <FontAwesomeIcon icon="times" />
  </button>
);

export default DeleteButton;
