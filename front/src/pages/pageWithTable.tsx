import { useState } from "react";
import NavButton from "../elements/navbutton";
import Table, { ITableProps } from "../components/table";
import { getData } from "../utils/requests";

const PageWithTable = () => {
  const requestString = `http://localhost:5000/api${document.location.pathname}`;
  const [response, setResponse] = useState<ITableProps>({ colNames: [], data: [] });

  if (!response.colNames.length) getData<ITableProps>(requestString, setResponse);
  return (
    <>
      <NavButton to="/" name="Back" />
      <Table colNames={response.colNames} data={response.data} />
    </>
  );
};

export default PageWithTable;
