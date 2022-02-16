import axios from "axios";
function getTableData(uri, callback){
    axios.get(uri)
        .then((response)=>callback(response.data))
        .catch((error)=>console.error(error))
}

export default getTableData;