import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@/components/table";
import { RootState } from "@/redux/store/store";
import { deleteCatalogue } from "@/api/deleteRequests/deleteRequests";
import { Catalogue } from "@/pages/catalogue/editCatalogue";
import { getCatalogueListRequest } from "@/api/multipleGetRequests";

const CatalogueList = () => {
  const localisation = useSelector((state) => (state as RootState).localisation.info);
  const [data, setData] = useState<{ data: Catalogue[]; res: boolean }>({ data: [], res: false });

  const colNames = [
    "Id",
    localisation.proposal,
    localisation.name,
    localisation.description,
    localisation.date,
    localisation.price,
  ];

  if (!data.res) getCatalogueListRequest((list: Array<Catalogue>) => setData({ data: list, res: true }));

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
      deleteCatalogue(lineIndex, removeLine(lineIndex));

  const dataToStrings = (_data: Catalogue[]): string[][] => {
    const res: string[][] = [];
    _data.map((val) =>
      res.push([
        `${val.id}`,
        `${val.proposalProposalId}`,
        val.proposal_name,
        val.description,
        val.addition_date,
        `${val.price_per_year}`,
      ])
    );
    return res;
  };

  return <Table colNames={colNames} data={dataToStrings(data.data)} createDeleteAction={createDeleteAction} />;
};

export default CatalogueList;
