import axios from "axios";
import localhost from "@/data/localhost";
import { Dispatch } from "redux";
import { setUserAction } from "@/redux/actionCreators/userActionsCreator";
import User from "@/redux/types/user";

// eslint-disable-next-line import/prefer-default-export
export function loginRequest(
  email: string,
  password: string,
  responseMethod: (success: boolean) => void,
  dispathch: Dispatch
) {
  axios
    .post(`${localhost}/users/login`, { email, password })
    .then((response) => {
      responseMethod(true);
      const userInfo: User = {
        id: response.data.user_id,
        name: response.data.first_name,
        token: undefined,
        isAdmin: response.data.role_id === 1,
      };
      dispatch(setUserAction(userInfo));
    })
    .catch((error) => {
      console.error(error);
      alert("Incorrect email or password!");
    });
}
