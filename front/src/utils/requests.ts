import axios from "axios";

export function getData<T>(uri: string, callback: (data: T) => void) {
  // GET: getting all table with column names
  axios
    .get(uri)
    .then((response) => callback(response.data))
    .catch((error) => console.error(error));
}

export function deleteDataByIndex(uri: string, index: number, callback: () => void) {
  // DELETE: send index in uri, on success perform local deleting callback
  axios
    .delete(`${uri}/${index}`)
    .then(() => callback())
    .catch((error) => console.error(error));
}
