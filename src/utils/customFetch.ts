import axios from "axios";
const url = "http://localhost:5000";
// const url = "http://localhost:5000/api";
export const customFetch = axios.create({ baseURL: url });
