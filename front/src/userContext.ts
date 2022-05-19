import React from "react";

export interface IUserContext {
  userName: string | undefined;
  setUserName: (arg: string | undefined) => void;
}

const defaultValue: IUserContext = {
  userName: undefined,
  setUserName: (arg: string | undefined) => {
    console.log(arg);
  },
};

const UserContext = React.createContext(
  defaultValue // значеине по умолчанию
);

export default UserContext;
