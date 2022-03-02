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

export function updateData<T>(uri: string, data: T, callback: (updatedData: T) => void) {
  // PUT: send all table updated, get all updated info (without columnNames)
  axios
    .put(uri, data)
    .then((response) => callback(response.data))
    .catch((error) => console.error(error));
}

export function createData<T>(uri: string, data: T, callback: (newData: T) => void) {
  // POST: send new line, get new line added
  axios
    .post(uri, data)
    .then((response) => callback(response.data))
    .catch((error) => console.error(error));
}
