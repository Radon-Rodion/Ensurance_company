import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { deleteDataByIndex } from "@/utils/requests";
import DeleteButton from "@/elements/deletebutton";

interface ITableRowProps {
  key: number;
  data: Array<string>;
  onDelete: (index: number) => void;
}

const TableRow = (props: ITableRowProps) => {
  const page = useSelector((state) => (state as RootState).page.page.uri);
  const deleteAction = () => {
    deleteDataByIndex(page, props.key, () => {
      props.onDelete(props.key);
    });
  };
  return (
    <tr>
      {props.data.map((element, index) => (
        <td key={index}>{element}</td>
      ))}
      <td>
        <DeleteButton onClick={deleteAction} />
      </td>
    </tr>
  );
};

export default TableRow;
