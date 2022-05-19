import { SET_USER, RESET } from "@/redux/actions/userActions";
import User from "../types/user";

export const setUserAction = (payload: User) => ({ type: SET_USER, payload });
export const resetUserAction = () => ({ type: RESET });
