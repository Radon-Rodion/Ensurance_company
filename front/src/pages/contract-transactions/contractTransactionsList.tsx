import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@/components/table";
import { RootState } from "@/redux/store/store";
import { deleteContractTransaction } from "@/api/deleteRequests/deleteRequests";
import { ContractTransaction } from "./editContractTransaction";
import { getContractTransactionsListRequest } from "@/api/multipleGetRequests";

const ContractTransactionsList = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [data, setData] = useState<{ data: ContractTransaction[]; res: boolean }>({ data: [], res: false });

  const colNames = ["Id", localisation.contractId, localisation.transactionId];

  if (!data.res) getContractTransactionsListRequest((list) => setData({ data: list, res: true }));

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
      deleteContractTransaction(lineIndex, removeLine(lineIndex));

  const dataToStrings = (_data: ContractTransaction[]): string[][] => {
    const res: string[][] = [];
    _data.map((val) => res.push([`${val.id}`, `${val.contractContractId}`, `${val.transactionTransactionId}`]));
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

export default ContractTransactionsList;
