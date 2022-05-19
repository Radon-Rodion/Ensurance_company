import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@/components/table";
import { RootState } from "@/redux/store/store";
import { deleteTransaction } from "@/api/deleteRequests/deleteRequests";
import { Transaction } from "./editTransaction";
import { getTransactionsListRequest } from "@/api/multipleGetRequests";

const TransactionsList = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [data, setData] = useState<{ data: Transaction[]; res: boolean }>({ data: [], res: false });

  const colNames = ["Id", localisation.sum, localisation.sender, localisation.reciever, localisation.date];

  if (!data.res) getTransactionsListRequest((list) => setData({ data: list, res: true }));

  const removeLine =
    (index: number): (() => void) =>
    () => {
      const newData = data.data.filter((val) => val.transaction_id !== index);
      setData({ data: newData, res: data.res });
      console.log(data);
    };

  const createDeleteAction =
    (lineIndex: number): (() => void) =>
    () =>
      deleteTransaction(lineIndex, removeLine(lineIndex));

  const dataToStrings = (_data: Transaction[]): string[][] => {
    const res: string[][] = [];
    _data.map((val) =>
      res.push([
        `${val.transaction_id}`,
        `${val.transaction_sum}`,
        val.sender_bank_number,
        val.reciever_bank_number,
        val.transaction_date,
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

export default TransactionsList;
