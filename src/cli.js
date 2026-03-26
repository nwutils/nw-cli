#!/usr/bin/env node

import process from 'node:process';

import get from '@nwutils/getter';
import run from '@nwutils/runner';
import { program } from 'commander';

import { create } from '../src/commands/create.js';
import util from '../src/utils.js';

function applyOptions(cmd) {
    return cmd
        // Get
        .option('--version <version>', 'NW.js version', 'latest')
        .option('--flavor <flavor>', 'NW.js flavor', 'normal')
        .option('--platform <platform>', 'NW.js platform', util.PLATFORM_KV[process.platform])
        .option('--arch <arch>', 'NW.js architecture', util.ARCH_KV[process.arch])
        .option('--downloadUrl <string>', 'Download URL', 'https://dl.nwjs.io')
        .option('--manifestUrl <string>', 'Manifest URL', 'https://nwjs.io/versions.json')
        .option('--cacheDir <dir>', 'Cache directory', util.CACHE_DIR)
        .option('--cache <boolean>', 'Cache binaries', true)
        .option('--ffmpeg <boolean>', 'Download community ffmpeg', false)
        .option('--nativeAddon <boolean>', 'Download NW.js Node headers', false)
        .option('--shaSum <boolean>', 'Verify SHASUM', true)
        // Run
        .option('--srcDir <dir>', 'Project source directory', '.')
        .option('--argv <item...>', 'Command line arguments', [])

}

program
    .name('nw')
    .description('Command line utility for NW.js applications');

program
    .command('create')
    .argument('<name>', 'app name')
    .option('--template <template>', 'template name', 'vanilla-js')
    .option('--outDir <dir>', 'output directory', '.')
    .action((name, options) => {
        create(name, options.template, options.outDir);
    });

applyOptions(
    program
        .command('dev')
        .description('Run app in development mode')
).action(async (options) => {
    console.log('Getting NW.js binaries...');
    await get(options);
    console.log('Running NW.js app...');
    await run(options);
});

program.parse(process.argv);
