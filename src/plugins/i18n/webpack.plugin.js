const { EventEmitter } = require("events");
//const path = require("path");
//const fs = require("fs");

module.exports = class TestPlugin extends EventEmitter {
    static defaultOptions = {

    };

    static pluginSymbol = Symbol(TestPlugin.constructor.name);

    static rule = {
        resourceQuery: /blockType=i18n/,
        loader: require.resolve("./webpack.loader.js")
    }

    /**@param { import("webpack").Compiler } compiler */
    apply(compiler) {
        const { NormalModule } = compiler.webpack;

        // pass options to loader
        compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
            const { loader: normalModuleHook } = NormalModule.getCompilationHooks(compilation);
            normalModuleHook.tap(
                this.constructor.name,
                /**@param { any } loaderContext */
                loaderContext => { loaderContext[TestPlugin.pluginSymbol] = TestPlugin.defaultOptions }
            );
        });
    }
}