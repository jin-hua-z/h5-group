import { post, get } from "../request";

export const getConfigDataDD = (params: any) => {
  return post("/getConfigDataDD", params);
};
