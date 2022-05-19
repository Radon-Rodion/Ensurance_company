import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@/components/table";
import { RootState } from "@/redux/store/store";
import { deleteProposal } from "@/api/deleteRequests/deleteRequests";
import { Proposal } from "@/pages/proposal/editProposal";
import { getProposalsListRequest } from "@/api/multipleGetRequests";

const ProposalsList = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [data, setData] = useState<{ data: Proposal[]; res: boolean }>({ data: [], res: false });

  const colNames = ["Id", localisation.name, localisation.description];

  if (!data.res) getProposalsListRequest((list) => setData({ data: list, res: true }));

  const removeLine =
    (index: number): (() => void) =>
    () => {
      const newData = data.data.filter((val) => val.proposal_id !== index);
      setData({ data: newData, res: data.res });
      console.log(data);
    };

  const createDeleteAction =
    (lineIndex: number): (() => void) =>
    () =>
      deleteProposal(lineIndex, removeLine(lineIndex));

  const dataToStrings = (_data: Proposal[]): string[][] => {
    const res: string[][] = [];
    _data.map((val) => res.push([`${val.proposal_id}`, val.proposal_name, val.description]));
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

export default ProposalsList;
