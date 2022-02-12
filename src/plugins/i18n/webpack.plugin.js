const { EventEmitter } = require("events");
const path = require("path");
const fs = require("fs");

module.exports = class TestPlugin extends EventEmitter {
    static defaultOptions = {

    };

    static rule = {
        resourceQuery: /blockType=i18n/,
        loader: require.resolve("./webpack.loader.js")
    }

    /**@param { import("webpack").Compiler } compiler */
    apply(compiler) {

    }
}