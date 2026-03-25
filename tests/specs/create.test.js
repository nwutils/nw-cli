import assert from "node:assert/strict";
import fs from "node:fs";
import { after, before, describe, it } from "node:test";

import { create } from "../../src/commands/create.js";

describe("commands test suite", function () {

    before(function () {
        fs.mkdirSync("./tests/fixtures/create", { recursive: true });
    });

    it("creates a new NW.js application using template", function () {

        create("demo", "vanilla-js", "./tests/fixtures/create");

        assert.strictEqual(fs.existsSync("./tests/fixtures/create/demo"), true);
    });

    it("throws an error if the specified template is not supported", function () {
        assert.throws(() => {
            create("demo", "unsupported-template", "./tests/fixtures/create");
        }, /Template "unsupported-template" is not supported./);    
    });

    after(function () {
        fs.rmSync("./tests/fixtures/create/demo", { recursive: true, force: true });
    });
});
