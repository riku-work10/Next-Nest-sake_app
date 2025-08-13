import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001", // Nest.js 側のAPI URL
  headers: {
    "Content-Type": "application/json",
  },
});
