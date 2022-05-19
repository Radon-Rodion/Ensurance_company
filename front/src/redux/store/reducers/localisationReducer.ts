/* eslint-disable default-param-last */
import { SET_LOCALISATION, RESET } from "@/redux/actions/localisationActions";
import serialize from "@/redux/supportFunctions/serialize";
import localisations, { ILocalisation } from "@/data/localisations";
import LocalisationAction from "@/redux/types/localisationAction";

const LOCALISATION = "_localisation";

const defaultState: { info: ILocalisation } = {
  info: localisations[0],
};

const localisationReducer = (state = defaultState, action: LocalisationAction) => {
  switch (action.type) {
    case SET_LOCALISATION:
      serialize<ILocalisation>(action.payload as ILocalisation, LOCALISATION);
      return { ...state, info: action.payload as ILocalisation };
    case RESET:
      localStorage.clear();
      return { ...state, info: localisations[0] };
    default:
      return state;
  }
};

export default localisationReducer;
