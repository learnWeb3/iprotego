import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROOT_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export function getAuthorizationHeaders(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function registerCustomer(accessToken: string) {
  const endpoint = `customer`;
  const headers = {
    ...getAuthorizationHeaders(accessToken),
  };
  return await api
    .post<
      any,
      AxiosResponse<{
        _id: string;
      }>
    >(
      endpoint,
      {},
      {
        headers,
      }
    )
    .then(({ data }) => data);
}
