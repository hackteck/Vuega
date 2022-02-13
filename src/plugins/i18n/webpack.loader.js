const componentPropertyName = "__i18n";

/**
 * @this import("webpack").LoaderContext<any>
 * @type { import("webpack").LoaderDefinitionFunction }
 */
function loaderFunction(source, map) {
    let content = "";
    if (this.mode == "development") {
        content = `export default function (Component) { Component.${componentPropertyName} = ${source}; }`;
    }
    this.callback(null, content, map);
}

/**
 * @this { import("webpack").LoaderContext<any> }
 * @param { string } request
 */
function pitch(request) {

}

module.exports = {
    componentPropertyName,
    default: loaderFunction,
    pitch
}