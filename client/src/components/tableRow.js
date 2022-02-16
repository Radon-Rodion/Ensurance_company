

const TableRow = (props) => {
  return (
    <tr>
        {props.data.map((element, index) => (
            <td key={index}>{element}</td>
        ))}
    </tr>
  );
};

export default TableRow;
