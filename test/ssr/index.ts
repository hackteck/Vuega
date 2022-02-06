import * as path from "path";
import * as createServerConfig from "../../webpack/webpack.config.server"

const { output } = createServerConfig();
const serverBundleFile = path.resolve(output.path, output.filename.toString());

(async function () {
    const { default: build } = await import(serverBundleFile);
    const html = await build();
    console.log(html);
})()
