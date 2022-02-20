import React, { useRef, FormEvent } from "react";

interface INewTableRowProps {
  nFields: number;
  callback: (data: string[]) => void;
}

const NewTableRow = (props: INewTableRowProps) => {
  const newData = useRef<string[]>();
  newData.current = new Array<string>(props.nFields);
  newData.current.fill("");

  const onSubmit = () => {
    props.callback(newData.current);
  };
  const onDataChange =
    (index: number): ((e: FormEvent) => void) =>
    (e: FormEvent) => {
      newData.current[index] = (e.target as HTMLInputElement).value;
    };
  console.log(newData.current);
  return (
    <tr>
      {newData.current.map((element, index) => (
        <td key={index}>
          <input onChange={onDataChange(index)} defaultValue={element} />
        </td>
      ))}
      <td>
        <button type="button" onClick={onSubmit}>
          Create
        </button>
      </td>
    </tr>
  );
};

export default React.memo(NewTableRow, (prevProps, nextProps) => prevProps.nFields === nextProps.nFields);
