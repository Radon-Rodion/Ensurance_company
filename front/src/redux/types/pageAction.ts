import Page from "./page";

interface PageAction {
  type: string;
  payload?: Page | undefined;
}

export default PageAction;
