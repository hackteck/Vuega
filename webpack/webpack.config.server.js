//@ts-check

const path = require("path");
const createBaseConfig = require("./webpack.config.base.js");

module.exports = (env = {}) => {
  env.SSR = env.SSR || "true";
  const baseConfig = createBaseConfig(env);

  /**@type { import("webpack").Configuration } */
  const serverConfig = {
    target: "node",
    entry: path.resolve(__dirname, "../src/entry_server.ts"),
    output: {
      path: path.resolve(process.env.SERVER_OUTPUT_PATH || env.SERVER_OUTPUT_PATH || "dist_ssr"),
      filename: "ssr_bundle.js",
      libraryTarget: "umd"
    },
    externals: [
      //nodeExternals()
    ]
  }

  return Object.assign(baseConfig, serverConfig);
}