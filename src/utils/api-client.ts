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

let _client: Client | null = null;

const initPromise = api.init().then(() =>
  api.getClient<Client>().then((client) => {
    _client = client;
    return client;
  })
);

const waitForApi = async (): Promise<Client> => {
  if (_client) return _client;
  return await initPromise;
};

let openApiclient: Client;
initPromise.then((client) => {
  openApiclient = client;
});

const client = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

export { openApiclient, waitForApi, client };
