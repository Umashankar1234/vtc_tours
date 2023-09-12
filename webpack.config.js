const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/"
  },
  resolve: {
    // configuration options
    modules: [path.resolve(__dirname, "./src"), "node_modules"]
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        use: "babel-loader"
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: "file-loader"
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      favicon: "./public/favicon.ico"
    })
  ]
};