import axios from "axios";

const api = axios.create({
  baseURL: "https://vast-atoll-52124.herokuapp.com/",
});

const errHandler = (err) => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default async function handler(req, res) {
  const contractData = { 0: "placehold", 1: "placeholder", 2: "placeholder" };

  await api
    .get("/firstContract")
    .then((res) => res.data)
    .catch(errHandler)
    .then((data) => (contractData[0] = data));

  await api
    .get("/secondContract")
    .then((res) => res.data)
    .catch(errHandler)
    .then((data) => (contractData[1] = data));

  await api
    .get("/bot")
    .then((res) => res.data)
    .catch(errHandler)
    .then((data) => (contractData[2] = data));

  await res.status(200).json(contractData);
}
