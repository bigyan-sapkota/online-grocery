import axios from "axios";
import { backendUrl } from "./consts";

export const apiClient = axios.create({
  baseURL: backendUrl,
});
