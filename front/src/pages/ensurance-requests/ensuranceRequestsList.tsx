import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@/components/table";
import { RootState } from "@/redux/store/store";
import { deleteEnsuranceRequest } from "@/api/deleteRequests/deleteRequests";
import { EnsuranceRequest } from "./editEnsuranceRequest";
import { getEnsuranceRequestsListRequest } from "@/api/multipleGetRequests";

const EnsuranceRequestsList = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [data, setData] = useState<{ data: EnsuranceRequest[]; res: boolean }>({ data: [], res: false });

  const colNames = [
    "Id",
    localisation.contractId,
    localisation.comment,
    localisation.photo,
    localisation.date,
    localisation.status,
    localisation.transactionId,
  ];

  if (!data.res) getEnsuranceRequestsListRequest((list) => setData({ data: list, res: true }));

  const removeLine =
    (index: number): (() => void) =>
    () => {
      const newData = data.data.filter((val) => val.id !== index);
      setData({ data: newData, res: data.res });
      console.log(data);
    };

  const createDeleteAction =
    (lineIndex: number): (() => void) =>
    () =>
      deleteEnsuranceRequest(lineIndex, removeLine(lineIndex));

  const dataToStrings = (_data: EnsuranceRequest[]): string[][] => {
    const res: string[][] = [];
    _data.map((val) =>
      res.push([
        `${val.id}`,
        `${val.contractContractId}`,
        val.user_comment,
        val.photo_approvement,
        val.request_date,
        val.status,
        `${val.transactionTransactionId}`,
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

export default EnsuranceRequestsList;
