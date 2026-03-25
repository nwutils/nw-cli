import fs from "node:fs";
import path from "node:path";

/**
 * Create a NW.js application using a predefined template.
 * @function
 * @param {string} name - The name of the application to create.
 * @param {string} template - The template to use for the application.
 * @param {string} outDir - The output directory where the application will be created.
 * @error Throws an error if the specified template is not supported.
 * @returns {void}
 */
export function create(name, template, outDir) {
    if (template === "vanilla-js") {
        const vanillaJsTemplatePath = path.resolve("src", "templates", "vanilla-js");
        const outDirPath = path.resolve(outDir, name);
        fs.cpSync(vanillaJsTemplatePath, outDirPath, { recursive: true });

        const packageJsonPath = path.join(outDirPath, "package.json");
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
        packageJson.name = name;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf-8");
        const indexHtmlPath = path.join(outDirPath, "index.html");
        const indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");
        const updatedIndexHtml = indexHtml.replace(/{{APP_NAME}}/g, name);
        fs.writeFileSync(indexHtmlPath, updatedIndexHtml, "utf-8");
    } else {
        throw new Error(`Template "${template}" is not supported.`);
    }
}
