// webpack.base.js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "../src/index.js"), // 入口文件
  // 打包文件出口
  output: {
    filename: "[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../../h5/src/utils"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: "babel-loader",
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
};
