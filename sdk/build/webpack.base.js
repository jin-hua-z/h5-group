const path = require("path");
module.exports = {
  entry: path.join(__dirname, "../src/index.ts"),
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "../dist"),
    clean: true,
    publicPath: "./",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
};
