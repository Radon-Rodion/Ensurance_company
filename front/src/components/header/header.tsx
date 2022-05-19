import { useDispatch, useSelector } from "react-redux";
import { FormEvent } from "react";
import { RootState } from "@/redux/store/store";
import "./header.scss";
import localisations from "@/data/localisations";
import { setLocalisationAction } from "@/redux/actionCreators/localisationActionsCreator";

const Header = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const user = useSelector((state) => (state as RootState).user.info);
  const dispatch = useDispatch();

  console.log(user);

  const onChange = (e: FormEvent) => {
    dispatch(setLocalisationAction(+(e.target as HTMLInputElement).value));
  };
  return (
    <div className="menu">
      <label htmlFor="userName">{user.name ?? undefined}</label>
      <label htmlFor="select" className="label">
        {localisation.select}
        <select className="languageSelect" onChange={onChange} defaultValue={localisation.key}>
          {localisations.map((val) => (
            <option value={val.key} key={val.key}>
              {val.language}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Header;
