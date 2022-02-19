import React from "react";
import TableRow from "./tableRow";

export interface ITableProps {
  colNames: Array<string>;
  data: Array<Array<string>>;
}

const Table = (props: ITableProps) => (
  <table>
    <thead>
      <tr>
        {props.colNames.length
          ? props.colNames.map((columnName, index) => <th key={index}>{columnName}</th>)
          : undefined}
      </tr>
    </thead>
    <tbody>
      {props.data.length ? props.data.map((rowData, index) => <TableRow key={index} data={rowData} />) : undefined}
      
    </tbody>
  </table>
);

export default Table;
