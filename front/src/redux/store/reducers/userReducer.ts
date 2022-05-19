/* eslint-disable default-param-last */
import { SET_USER, RESET } from "@/redux/actions/userActions";
import serialize from "@/redux/supportFunctions/serialize";
import User from "@/redux/types/user";
import UserAction from "@/redux/types/userAction";

const USER = "userInfo";

const defaultState: { info: User } = {
  info: JSON.parse(localStorage.getItem(USER) ?? '{"id":0, "isAdmin":false}'),
};

const userReducer = (state = defaultState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      serialize<User>(action.payload as User, USER);
      return { ...state, info: action.payload as User };
    case RESET:
      localStorage.clear();
      return { ...state, info: { id: -1, isAdmin: false } as User };
    default:
      return state;
  }
};

export default userReducer;
