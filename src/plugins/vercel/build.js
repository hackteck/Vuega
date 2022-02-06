//@ts-check

const { execSync } = require('child_process');

execSync("npm run build-client");
execSync("npm run build-server");

// remove index.html and always use SSR
const path = require("path");
const fs = require("fs");
const clientConfig = require("../../../webpack/webpack.config.client.js")();
const src = path.resolve(clientConfig.output.path, "index.html");
if (fs.existsSync(src)) fs.unlinkSync(src);