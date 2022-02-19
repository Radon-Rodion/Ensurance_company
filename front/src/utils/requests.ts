import axios from "axios";

function getTableData<T>(uri: string, callback: (param: T) => void) {
  axios
    .get(uri)
    .then((response) => callback(response.data))
    .catch((error) => console.error(error));
}

export default getTableData;
