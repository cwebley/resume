import fs from "node:fs/promises";
import path from "node:path";
import { home } from "../src/pages/home.js";

const distDir = path.resolve("dist");

await fs.mkdir(distDir, { recursive: true });
await fs.writeFile(path.join(distDir, "index.html"), home(), "utf8");
await fs.copyFile("src/favicon.svg", path.join(distDir, "favicon.svg"));

console.log("[site] Built dist/index.html");
