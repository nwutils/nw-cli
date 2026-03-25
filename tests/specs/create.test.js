import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { afterEach, before, describe, it } from "node:test";

import { create } from "../../src/commands/create.js";

const BASE_DIR = "./tests/fixtures/create";

describe("create command", function () {

    before(function () {
        fs.mkdirSync(BASE_DIR, { recursive: true });
    });

    afterEach(function () {
        // clean everything after each test
        if (fs.existsSync(BASE_DIR)) {
            fs.rmSync(BASE_DIR, { recursive: true, force: true });
            fs.mkdirSync(BASE_DIR, { recursive: true });
        }
    });

    // ✅ 1. Happy path
    it("creates a new NW.js application using template", function () {
        create("demo", "vanilla-js", BASE_DIR);

        assert.strictEqual(
            fs.existsSync(path.join(BASE_DIR, "demo")),
            true
        );
    });

    // ❗ 2. Prevent overwrite
    it("throws if target directory already exists", function () {
        const target = path.join(BASE_DIR, "demo");
        fs.mkdirSync(target, { recursive: true });

        assert.throws(() => {
            create("demo", "vanilla-js", BASE_DIR);
        }, /already exists/i);
    });

    // ❗ 3. Invalid template
    it("throws if template is not supported", function () {
        assert.throws(() => {
            create("demo", "unsupported-template", BASE_DIR);
        }, /not found|not supported/i);
    });

    // ❗ 4. Invalid app name
    it("throws on invalid app name", function () {
        assert.throws(() => {
            create("invalid/name", "vanilla-js", BASE_DIR);
        }, /invalid app name/i);
    });

    // ❗ 5. package.json updated correctly
    it("updates package.json name field", function () {
        create("demo", "vanilla-js", BASE_DIR);

        const pkgPath = path.join(BASE_DIR, "demo", "package.json");
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

        assert.strictEqual(pkg.name, "demo");
    });

    // ❗ 7. index.html placeholder replacement
    it("replaces APP_NAME in index.html", function () {
        create("demo", "vanilla-js", BASE_DIR);

        const htmlPath = path.join(BASE_DIR, "demo", "index.html");
        const html = fs.readFileSync(htmlPath, "utf-8");

        assert.ok(html.includes("demo"));
        assert.ok(!html.includes("{{APP_NAME}}"));
    });

    // ❗ 8. Missing package.json
    it("throws if package.json is missing or invalid", function () {
        const brokenTemplate = "broken-template";
        const templatesPath = path.resolve("src/templates");
        const templateSource = path.join(templatesPath, "vanilla-js");
        const templateDestination = path.join(templatesPath, brokenTemplate);

        // copy and corrupt template package.json
        fs.cpSync(templateSource, templateDestination, { recursive: true });
        fs.writeFileSync(path.join(templateDestination, "package.json"), "{ invalid json");

        assert.throws(() => {
            create("demo2", brokenTemplate, BASE_DIR);
        }, /package\.json/i);

        fs.rmSync(templateDestination, { recursive: true, force: true });
    });

});
