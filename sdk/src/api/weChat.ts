import { post, get } from "../request";

export const getConfigDataWeChat = (params: any) => {
  return post("/getConfigDataWeChat", params);
};
