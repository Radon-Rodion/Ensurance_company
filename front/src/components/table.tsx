import { FormEvent } from "react";
import NewTableRow from "./newTableRow";
import TableRow from "./tableRow";

export interface ITableProps {
  colNames: Array<string>;
  data: Array<Array<string>>;
  editFieldCreator: (line: number) => (column: number) => (e: FormEvent) => void;
  createDeleteAction: (lineIndex: number) => () => void;
  createAction: (newData: string[]) => void;
  updateAction: () => void;
}

const Table = (props: ITableProps) => (
  <>
    <table>
      <thead>
        <tr>
          {props.colNames.length
            ? props.colNames.map((columnName) => <th key={columnName}>{columnName}</th>)
            : undefined}
        </tr>
      </thead>
      <tbody>
        {props.data.length
          ? props.data.map((rowData, index) => (
              <TableRow
                key={+rowData[0]}
                data={rowData}
                createEditField={props.editFieldCreator(index)}
                onDelete={props.createDeleteAction(+rowData[0])}
              />
            ))
          : undefined}
        <NewTableRow callback={props.createAction} nFields={props.colNames.length} />
      </tbody>
    </table>
    <button type="button" onClick={props.updateAction}>
      Update Table
    </button>
  </>
);

export default Table;