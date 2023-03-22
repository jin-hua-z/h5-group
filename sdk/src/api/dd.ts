import { post, get } from "../request";

export const getConfigData = (params: any) => {
  return post("/getConfigData", params);
};
