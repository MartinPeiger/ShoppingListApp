import { listMockApi } from "../mock/listMockApi";
import { itemMockApi } from "../mock/itemMockApi";

const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const api = {
  lists: USE_MOCK ? listMockApi : null,
  items: USE_MOCK ? itemMockApi : null
};