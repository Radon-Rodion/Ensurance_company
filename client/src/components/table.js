import React from "react";
import TableRow from "./tableRow";

const Table = (props) => {
  console.log(props);
  return (
    <table>
      <thead>
        <tr>
            {props.colNames.length ? Array.from(props.colNames).map((columnName, index) => (
            <th key={index}>{columnName}</th>
            )): undefined}
        </tr>
      </thead>
      <tbody>
        {props.data.length ? Array.from(props.data).map((rowData, index) => (
          <TableRow key={index} data={rowData} />
        )): undefined}
      </tbody>
    </table>
  );
};

export default Table;