import { Methods } from "types/types";
const baseUrl = process.env.REACT_APP_API_URL;

interface Props {
  endpoint: string;
  body?: object;
  method?: Methods;
}

export const fetchWithoutToken = ({
  endpoint,
  body,
  method = "GET"
}: Props) => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
};

export const fetchWithToken = ({ endpoint, body, method = "GET" }: Props) => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token
      }
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token
      },
      body: JSON.stringify(body)
    });
  }
};
