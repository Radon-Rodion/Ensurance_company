import React from "react";
import TableRow from "./tableRow";

const Table = (props) => {
  return (
    <table>
      <thead>
        <tr>
            {props.columnsNames.map((columnName, index) => (
            <th key={index}>{columnName}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((rowData, index) => (
          <TableRow key={index} data={rowData} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;