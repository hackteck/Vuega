/**
 * @this import("webpack").LoaderContext<any>
 * @type { import("webpack").LoaderDefinitionFunction }
 */
module.exports.default = function (source, map) {
    this.callback(
        null,
        `export default function (Component) { Component.__i18n = ${source}; }`,
        map
    )
}

/**
 * @this { import("webpack").LoaderContext<any> }
 * @param { string } request
 */
module.exports.pitch = function (request) {
    
} 