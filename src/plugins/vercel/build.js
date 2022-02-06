//@ts-check

const { execSync } = require('child_process');

execSync("npm run build-client");
execSync("npm run build-server");

// remove index.html and always use SSR
const path = require("path");
const fs = require("fs");
const nowConfig = require("./now.json");
const clientConfig = require("../../../webpack/webpack.config.client.js")();
const src = path.resolve(clientConfig.output.path, "index.html");
const dest = path.resolve(nowConfig.build.env.SERVER_OUTPUT_PATH, "index.html");

if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    fs.unlinkSync(src);
}