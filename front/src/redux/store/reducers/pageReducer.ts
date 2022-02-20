/* eslint-disable default-param-last */
import { SET_PAGE, RESET } from "@/redux/actions/pageActions";
import Page from "@/redux/types/page";
import UserAction from "@/redux/types/pageAction";
import serialize from "../supportFuncions/serialize";

const DEFAULT_URI = "http://localhost:5000/";
const PAGE = "PAGE";

const defaultState: { page: Page } = {
  page: JSON.parse(localStorage.getItem(PAGE) ?? `{"uri":"${DEFAULT_URI}"}`),
};

const pageReducer = (state = defaultState, action: UserAction) => {
  switch (action.type) {
    case SET_PAGE:
      serialize<Page>(action.payload as Page, PAGE);
      return { ...state, page: action.payload as Page };
    case RESET:
      localStorage.clear();
      return { ...state, page: { uri: DEFAULT_URI } };
    default:
      return state;
  }
};

export default pageReducer;
