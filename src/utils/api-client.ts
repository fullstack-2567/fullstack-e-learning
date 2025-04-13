import OpenAPIClientAxios from "openapi-client-axios";
import axios from "axios";
import { Client } from "@/utils/backend-openapi";

const BACKEND_URL = import.meta.env.VITE_END_POINT;

const api = new OpenAPIClientAxios({
  definition: `${BACKEND_URL}/api/openapi.json`,
  withServer: { url: BACKEND_URL },
  axiosConfigDefaults: {
    withCredentials: true,
  },
});

await api.init();
const openApiclient = await api.getClient<Client>();

// TO DO: Get rid of this after convert all api fetching to use openapiClient
const client = axios.create({
  baseURL: `${BACKEND_URL}`,
  withCredentials: true,
});

export { openApiclient, client };
