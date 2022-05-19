import User from "./user";

interface UserAction {
  type: string;
  payload?: User | undefined;
}

export default UserAction;
