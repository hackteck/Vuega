import * as fs from "fs"
import { NowRequest, NowResponse } from '@now/node'

const { default: serverBundle } = require(__dirname + "/ssr_bundle.js");
const templatePath = process.env.SSR_TEMPLATE || __dirname + "/index.html";
const template = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, "utf8") : `<!--vue-ssr-outlet-->`;

export default async (request: NowRequest, res: NowResponse) => {
    const { name = 'World' } = request.query;
    const content = await serverBundle({ name });
    res.send(template.replace(`<!--vue-ssr-outlet-->`, content));
}