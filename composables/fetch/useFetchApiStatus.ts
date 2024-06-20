import { API_URL } from "@/config";
export const useFetchApiStatus = () =>
  useFetch(API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    lazy: true,
  });
