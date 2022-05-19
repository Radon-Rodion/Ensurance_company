import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@/components/table";
import { RootState } from "@/redux/store/store";
import { deleteRole } from "@/api/deleteRequests/deleteRequests";
import { Role } from "@/pages/roles/editRole";
import { getRolesListRequest } from "@/api/multipleGetRequests";

const rolesList = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [data, setData] = useState<{ data: Role[]; res: boolean }>({ data: [], res: false });

  const colNames = ["Id", localisation.name];

  if (!data.res) getRolesListRequest((list) => setData({ data: list, res: true }));

  const removeLine =
    (index: number): (() => void) =>
    () => {
      const newData = data.data.filter((val) => val.role_id !== index);
      setData({ data: newData, res: data.res });
      console.log(data);
    };

  const createDeleteAction =
    (lineIndex: number): (() => void) =>
    () =>
      deleteRole(lineIndex, removeLine(lineIndex));

  const dataToStrings = (_data: Role[]): string[][] => {
    const res: string[][] = [];
    _data.map((val) => res.push([`${val.role_id}`, val.role_name]));
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

export default rolesList;
