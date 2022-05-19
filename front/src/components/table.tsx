import TableRow from "./tableRow";

export interface ITableProps {
  colNames: Array<string>;
  data: Array<Array<string>>;
  createDeleteAction: (lineIndex: number) => () => void;
}

const Table = (props: ITableProps) => (
  <table>
    <thead>
      <tr>
        {props.colNames.length ? props.colNames.map((columnName) => <th key={columnName}>{columnName}</th>) : undefined}
      </tr>
    </thead>
    <tbody>
      {props.data.length
        ? props.data.map((rowData) => (
            <TableRow key={+rowData[0]} data={rowData} onDelete={props.createDeleteAction(+rowData[0])} />
          ))
        : undefined}
    </tbody>
  </table>
);

export default Table;
