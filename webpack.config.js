const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index", // Entry point of your application
  output: {
    filename: "bundle.js", // Output bundle file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|gif|txt|pdf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
    },
    port: 3000, // Port for the development server
    open: true, // Open the default web browser when the server starts
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
};
