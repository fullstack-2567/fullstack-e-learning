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

// export เป็น Promise ที่ถูก init แล้ว
const openApiclientPromise = api.init().then(() =>
  api.getClient<Client>().then((client) => {
    _client = client;
    return client;
  })
);

// ✅ export แบบ async-safe สำหรับไฟล์ที่ await ได้
export const waitForApi = async () => {
  if (_client) return _client;
  return openApiclientPromise;
};

// ✅ export ตรงชื่อเดิม (แก้ error import เดิมได้)
export let openApiclient: Client;
openApiclientPromise.then((client) => {
  openApiclient = client;
});

export const client = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});
