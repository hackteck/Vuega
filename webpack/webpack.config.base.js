//@ts-check

const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.WEBPACK_SERVE ? "development" : "production";

module.exports = (env = {}) => {
    /**@type { import("webpack").Configuration } */
    const config = {
        mode,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        appendTsSuffixTo: [/\.vue$/]
                    }
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            ts: "ts-loader"
                        }
                    }
                },
                // SCSS
                {
                    test: /\.s?[c|a]ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '',
                                emit: !env.SSR
                            }
                        },
                        { loader: "css-loader" },
                        {
                            loader: "sass-loader",
                            options: {
                                sassOptions: {
                                    implementation: require("sass")
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.otf/,
                    type: 'asset/resource'
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".vue"],
            alias: {
                "@": path.resolve("./src")
            }
        },
        plugins: [
            // without this plugin errors not showing
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    extensions: {
                        vue: {
                            enabled: true,
                            compiler: '@vue/compiler-sfc'
                        }
                    },
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: false
                    }
                }
            }),
            new VueLoaderPlugin,
            new MiniCssExtractPlugin({
                filename: "css/bundle.css"
            }),
        ]
    }

    return config;
}