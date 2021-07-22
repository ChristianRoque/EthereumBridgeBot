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

export default function handler(req, res) {
  api
    .get("/firstContract")
    .then((res) => res.data)
    .catch(errHandler)
    .then((data) => res.status(200).json(data));
}
