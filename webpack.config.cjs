const path = require("path");
const nodeExternals = require( "webpack-node-externals");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.cjs",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 4000,
    hot:true,
    compress: true,
  }
};
