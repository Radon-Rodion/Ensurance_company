import { useState } from "react";
import NavButton from "../components/navbutton";
import Table from "../components/table";
import getTableData from "../requests";


const PageWithTable = (props) => {
    const requestString = `http://localhost:5000/api${document.location.pathname}`;
    console.log(requestString);
    const [response, setResponse] = useState({colNames: [], data: []});
    if(!response.colNames.length)
      getTableData(requestString, setResponse);
    return(
      <>
        <NavButton to="/" name="Back" />
        <Table colNames={response.colNames} data={response.data} />
      </>
    );
}

export default PageWithTable;
