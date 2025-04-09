import OpenAPIClientAxios from "openapi-client-axios";
import { Client } from "@/utils/backend-openapi";

const API_URL = import.meta.env.VITE_END_POINT;
const BACKEND_URL = import.meta.env.VITE_BACKEND_END_POINT;

const api = new OpenAPIClientAxios({
  definition: `${BACKEND_URL}/openapi.json`,
  withServer: { url: API_URL },
  axiosConfigDefaults: {
    withCredentials: true,
  },
});

await api.init();
const client = await api.getClient<Client>();

export default client;
