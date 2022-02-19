import { SET_PAGE, RESET } from "@/redux/actions/pageActions";

export const setPageAction = (uri: string) => ({ type: SET_PAGE, payload: { uri } });
export const resetPageAction = () => ({ type: RESET });
