const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: "file-loader?name=img/[name].[ext]",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "To-Do List",
      template: "./src/index.html",
    }),
    // Plugin for hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: "src/img", to: "img" }] }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
};
