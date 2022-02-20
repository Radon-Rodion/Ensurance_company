import React, { FormEvent } from "react";
import DeleteButton from "@/elements/deletebutton";
import compareArrays from "@/utils/comparators";

interface ITableRowProps {
  data: Array<string>;
  onDelete: () => void;
  createEditField: (column: number) => (e: FormEvent) => void;
}

const TableRow = (props: ITableRowProps) => (
  <tr>
    {props.data.map((element, index) => (
      <td key={index}>
        <input value={element} onChange={props.createEditField(index)} />
      </td>
    ))}
    <td>
      <DeleteButton onClick={props.onDelete} />
    </td>
  </tr>
);

export default React.memo(TableRow);
