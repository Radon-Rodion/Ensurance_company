import { SET_LOCALISATION, RESET } from "@/redux/actions/localisationActions";
import localisations, { ILocalisation } from "@/data/localisations";

export const setLocalisationAction = (payload: number) => ({ type: SET_LOCALISATION, payload: localisations[payload] });
export const resetLocalisationAction = () => ({ type: RESET });
