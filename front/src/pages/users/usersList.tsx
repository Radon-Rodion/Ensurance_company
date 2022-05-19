import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@/components/table";
import { RootState } from "@/redux/store/store";
import { deleteUser } from "@/api/deleteRequests/deleteRequests";
import { User } from "./editUser";
import { getUsersListRequest } from "@/api/multipleGetRequests";

const UsersList = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [data, setData] = useState<{ data: User[]; res: boolean }>({ data: [], res: false });

  const colNames = [
    "Id",
    localisation.firstName,
    localisation.lastName,
    localisation.email,
    localisation.passportNumber,
    localisation.phoneNumber,
    localisation.bankNumber,
    localisation.roleId,
    localisation.status,
  ];

  if (!data.res) getUsersListRequest((list) => setData({ data: list, res: true }));

  const removeLine =
    (index: number): (() => void) =>
    () => {
      const newData = data.data.filter((val) => val.user_id !== index);
      setData({ data: newData, res: data.res });
      console.log(data);
    };

  const createDeleteAction =
    (lineIndex: number): (() => void) =>
    () =>
      deleteUser(lineIndex, removeLine(lineIndex));

  const dataToStrings = (_data: User[]): string[][] => {
    const res: string[][] = [];
    _data.map((val) =>
      res.push([
        `${val.user_id}`,
        val.first_name,
        val.last_name,
        val.email,
        val.passportNumber,
        val.phone_number,
        val.bank_number,
        `${val.roleRoleId}`,
        val.status,
      ])
    );
    return res;
  };

  return (
    <>
      <Table colNames={colNames} data={dataToStrings(data.data)} createDeleteAction={createDeleteAction} />
      <nav>
        <NavLink to="new" className="btn btn-primary">
          {localisation.create}
        </NavLink>
      </nav>
    </>
  );
};

export default UsersList;
