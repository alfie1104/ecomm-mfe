const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8080,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container", //not used in host file, added for clarity. It only needed for Remotes
      remotes: {
        //list projects that the Container can search to get additional code
        //products : Load the file at the listed URL if anything in Container has an import like : import abc from "products";
        //"products" of url : Related to the 'name' property in the Products webpack.config.js file
        //url : Url for the remoteEntry file
        products: "products@http://localhost:8081/remoteEntry.js",
        cart: "cart@http://localhost:8082/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
