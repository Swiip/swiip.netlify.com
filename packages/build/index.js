const { resolve } = require("path");
const { ensureDir, copy, remove, readFile, writeFile } = require("fs-extra");
const { minify } = require("html-minifier");

const clientDistPath = resolve(__dirname, "../client/dist");
const clientPublicPath = resolve(__dirname, "../client/public");
const htmlSourcePath = resolve(clientPublicPath, "index.html");
const htmlDistPath = resolve(clientDistPath, "index.html");

const minifyHtmlOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeTagWhitespace: true,
  useShortDoctype: true,
  minifyCSS: true
};

const copyFrontPublic = async () => {
  console.log("Copying front public files to dist...");
  await remove(clientDistPath);
  await ensureDir(clientDistPath);
  await copy(clientPublicPath, clientDistPath);
  console.log("Copy ok!");
};

const minifyHtml = async () => {
  console.log("Minifying html...");
  const content = await readFile(htmlSourcePath);
  const minified = minify(content.toString(), minifyHtmlOptions);
  await writeFile(htmlDistPath, minified);
  console.log("Minify ok!");
};

copyFrontPublic().then(minifyHtml);
