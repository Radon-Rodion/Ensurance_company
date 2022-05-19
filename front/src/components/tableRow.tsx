import React from "react";
import { NavLink } from "react-router-dom";
import DeleteButton from "@/elements/deletebutton";
import ViewButton from "@/elements/viewButton";

interface ITableRowProps {
  data: Array<string>;
  onDelete: () => void;
}

const TableRow = (props: ITableRowProps) => (
  <tr>
    {props.data.map((element, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <td key={index}>{element}</td>
    ))}
    <td>
      <nav>
        <NavLink to={`${props.data[0]}`}>
          <ViewButton />
        </NavLink>
      </nav>
    </td>
    <td>
      <DeleteButton onClick={props.onDelete} />
    </td>
  </tr>
);

export default React.memo(TableRow);
