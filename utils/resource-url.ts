import { URL_STORAGE } from "@/config";
export const resourceUrl = (file_id: string = "") =>
  file_id ? `${URL_STORAGE}/${file_id}` : "";
