interface ITableRowProps {
  data: Array<string>;
}

const TableRow = (props: ITableRowProps) => (
  <tr>
    {Array.from(props.data).map((element, index) => (
      <td key={index}>{element}</td>
    ))}
  </tr>
);

export default TableRow;
