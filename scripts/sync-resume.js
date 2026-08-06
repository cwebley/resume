import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceFile = process.env.RESUME_SOURCE ?? "resume-full.md";
const markdownPath = path.join(rootDir, sourceFile);
const outputPath = path.join(rootDir, "src", "content", "resume-html.js");

const markdown = await fs.readFile(markdownPath, "utf8");
const parser = new MarkdownIt({
  // The Markdown file is author-controlled build input and uses semantic HTML
  // for role rows that need the repel layout composition.
  html: true,
  linkify: false,
  typographer: false,
});
const resumeHtml = parser.render(markdown);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(
  outputPath,
  `// Generated from ${sourceFile}. Do not edit directly.\nexport const resumeHtml = ${JSON.stringify(resumeHtml)};\n`,
  "utf8",
);

console.log("[resume] Generated src/content/resume-html.js");
