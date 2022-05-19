import { ILocalisation } from "@/data/localisations";

interface LocalisationAction {
  type: string;
  payload?: ILocalisation | undefined;
}

export default LocalisationAction;
