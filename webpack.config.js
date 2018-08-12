const NODE_ENV = process.env.NODE_ENV || "development";

const devMode = NODE_ENV === "development";
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const extractCSS = new ExtractTextPlugin("css/styles.css");

// const values = require("postcss-modules-values");

module.exports = {
  entry: "./dev/index.js",
  output: {
    path: path.resolve(__dirname, "prod"),
    filename: "bundle.js",
  },
  watch: devMode,
  devtool: devMode && "eval-source-map",
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js/,
        enforce: "pre",
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
        },
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // {
      //   // only modules way without files:
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //         localIdentName:
      //           NODE_ENV === "development"
      //             ? "[name]__[local]__[hash:base64:5]"
      //             : "[hash:base64:12]",
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: devMode
                ? "[name]__[local]__[hash:base64:5]"
                : "[hash:base64:12]",
            },
          },
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    extractCSS,
    new CopyWebpackPlugin([
      {
        from: path.resolve("./dev/static"),
        to: path.resolve("./prod"),
      },
    ]),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(devMode),
    }),
  ],
};
