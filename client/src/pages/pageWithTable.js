//import axios from "axios";
import { useState } from "react";
import NavButton from "../components/navbutton";
import Table from "../components/table";


const PageWithTable = (props) => {
    const requestString = `https:/localhost:5000${document.location.pathname}`;
    const [response, setResponse] = useState({colNames: [], data: [[]]});
    if(!response.colNames.length)
      fetch(requestString).then(response => response.json()).then(json => setResponse(json));
    return(
      <>
        <NavButton to="/" name="Back" />
        <Table columnNames={response.body.columnNames} data={response.data} />
      </>
    );
}

export default PageWithTable;
