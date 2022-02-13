const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createBaseConfig = require("./webpack.config.base.js");

/**@type { (env?: import("@/webpack").WebpackBuildEnv) => import("webpack").Configuration }*/
module.exports = (env = {}) => {
  const baseConfig = createBaseConfig(env);

  /**@type { import("webpack").Configuration } */
  const clientConfig = {
    entry: path.resolve(__dirname, "../src/entry_client.ts"),
    output: {
      path: path.resolve(process.env.CLIENT_OUTPUT_PATH || env.CLIENT_OUTPUT_PATH || "dist"),
      filename: 'js/[name].bundle.js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  }

  baseConfig.plugins = baseConfig.plugins || []; // Vercel not support ??= operator
  baseConfig.plugins.push(new HtmlWebpackPlugin({
    inject: false,
    minify: false,
    meta: {
      charset: "utf-8",
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    templateContent: ({ htmlWebpackPlugin }) => `
          <html lang="en">
            <head>
            <title>TEST</title>
              ${htmlWebpackPlugin.tags.headTags}
            </head>
            <body>
                <div id="app">
                    <!--vue-ssr-outlet-->
                </div>
              ${htmlWebpackPlugin.tags.bodyTags}
            </body>
          </html>
        `
  }))


  return Object.assign(baseConfig, clientConfig);
}