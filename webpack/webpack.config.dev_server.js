const path = require("path");
const createClientConfig = require("./webpack.config.client");

/**@type { (env: import("@/webpack").WebpackBuildEnv) => import("webpack").Configuration }*/
module.exports = (env = {}) => {
    const clientConfig = createClientConfig(env);
    return Object.assign(clientConfig, {
        devServer: {
            host: process.env.HOST,
            port: process.env.PORT || 8080,
            static: path.resolve(__dirname, "../public"),
            open: true,
            historyApiFallback: true,
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
        }
    });
}
