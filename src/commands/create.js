import fs from "node:fs";
import path from "node:path";
import url from "node:url";

/**
 * Create a NW.js application using a predefined template.
 * @param {string} name - The name of the application to create.
 * @param {string} template - The template to use.
 * @param {string} outDir - The output directory.
 */
export function create(name, template, outDir) {
    // Normalize input
    name = name.trim().toLowerCase();

    // Validate name (basic safe check)
    if (!/^[a-z0-9-_]+$/.test(name)) {
        throw new Error(
            "Invalid app name. Use only letters, numbers, '-' or '_'."
        );
    }

    // Resolve current file directory (ESM-safe __dirname)
    const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

    // Resolve template path
    const templatePath = path.resolve(__dirname, "../templates", template);

    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template "${template}" not found.`);
    }

    // Resolve output path
    const baseOutDir = path.resolve(outDir);
    const outDirPath = path.resolve(baseOutDir, name);

    // Prevent path traversal
    if (!outDirPath.startsWith(baseOutDir)) {
        throw new Error("Invalid path: potential path traversal detected.");
    }

    // Prevent overwrite
    if (fs.existsSync(outDirPath)) {
        throw new Error(`Directory "${outDirPath}" already exists.`);
    }

    // Copy template
    fs.cpSync(templatePath, outDirPath, {
        recursive: true,
        errorOnExist: true
    });

    // Update package.json
    const packageJsonPath = path.join(outDirPath, "package.json");

    try {
        const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, "utf-8")
        );

        packageJson.name = name;

        fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2),
            "utf-8"
        );
    } catch {
        throw new Error("Invalid or missing package.json in template.");
    }

    // Update index.html
    const indexHtmlPath = path.join(outDirPath, "index.html");

    if (fs.existsSync(indexHtmlPath)) {
        const indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");

        if (!indexHtml.includes("{{APP_NAME}}")) {
            console.warn("Warning: APP_NAME placeholder not found in index.html");
        }

        const updated = indexHtml.replace(/{{APP_NAME}}/g, name);

        fs.writeFileSync(indexHtmlPath, updated, "utf-8");
    }
}
