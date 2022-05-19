import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@/components/table";
import { RootState } from "@/redux/store/store";
import { deleteContract } from "@/api/deleteRequests/deleteRequests";
import { Contract } from "./editContract";
import { getContractsListRequest } from "@/api/multipleGetRequests";

const ContractsList = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [data, setData] = useState<{ data: Contract[]; res: boolean }>({ data: [], res: false });

  const colNames = [
    "Id",
    localisation.proposal,
    localisation.users,
    localisation.name,
    localisation.date,
    localisation.price,
    localisation.status,
  ];

  if (!data.res) getContractsListRequest((list: Array<Contract>) => setData({ data: list, res: true }));

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
      deleteContract(lineIndex, removeLine(lineIndex));

  const dataToStrings = (_data: Contract[]): string[][] => {
    const res: string[][] = [];
    _data.map((val) =>
      res.push([
        `${val.id}`,
        `${val.proposalProposalId}`,
        `${val.userUserId}`,
        val.proposal_name,
        val.request_date,
        `${val.price_per_year}`,
        val.status,
      ])
    );
    return res;
  };

  return (
    <Table colNames={colNames} data={dataToStrings(data.data)} createDeleteAction={createDeleteAction} />
  );
};

export default ContractsList;
