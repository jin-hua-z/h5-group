// webpack.prod.js

const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const path = require("path");
// const CopyPlugin = require("copy-webpack-plugin");
module.exports = merge(baseConfig, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../public"),
    //       to: path.resolve(__dirname, "../dist"),
    //       filter: (source) => {
    //         return !source.includes("index.html");
    //       },
    //     },
    //   ],
    // }),
  ],
});
