import { useState, FormEvent } from "react";
import NavButton from "../elements/navbutton";
import Table, { ITableProps } from "../components/table";
import { getData, createData, deleteDataByIndex, updateData } from "../utils/requests";

const PageWithTable = () => {
  const requestString = `http://localhost:5000/api${document.location.pathname}`;
  const [response, setResponse] = useState<ITableProps>({ colNames: [], data: [] });

  if (!response.colNames.length) getData<ITableProps>(requestString, setResponse);

  const removeLine =
    (index: number): (() => void) =>
    () => {
      const { data } = response;
      const newData = data.filter((val) => +val[0] !== index);
      setResponse({ ...response, data: newData });
      console.log(response.data);
    };

  const addLine = (newLine: string[]) => {
    const newData = response.data;
    newData.push(newLine);
    setResponse({ ...response, data: newData });
  };

  const updateTable = (allData: string[][]) => {
    setResponse({ ...response, data: allData });
  };

  const editFieldCreator =
    (line: number): ((column: number) => (e: FormEvent) => void) =>
    (column: number) =>
    (e: FormEvent) => {
      const newData = response.data;
      newData[line][column] = (e.target as HTMLInputElement).value;
      setResponse({ ...response, data: newData });
    };

  const createDeleteAction =
    (lineIndex: number): (() => void) =>
    () =>
      deleteDataByIndex(requestString, lineIndex, removeLine(lineIndex));

  const createAction = (newData: string[]) => {
    createData<string[]>(requestString, newData, addLine);
  };
  const updateAction = () => {
    updateData<string[][]>(requestString, response.data, updateTable);
  };
  return (
    <>
      <NavButton to="/" name="Back" />
      <Table
        colNames={response.colNames}
        data={response.data}
        editFieldCreator={editFieldCreator}
        createDeleteAction={createDeleteAction}
        createAction={createAction}
        updateAction={updateAction}
      />
    </>
  );
};

export default PageWithTable;
