import type { IApi } from "umi";

import fs from "fs";

export default (api: IApi) => {
  api.chainWebpack((config, { webpack }) => {
    // memo;
    fs.writeFile("./webpackConfig.txt", config.toString(), () => {});
  });
};
