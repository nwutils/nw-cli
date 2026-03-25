#!/usr/bin/env node

import process from 'node:process';
import { program } from 'commander';
import { create } from '../src/commands/create.js';

program
    .name('nw')
    .description('NW project CLI');

program
    .command('create')
    .argument('<name>', 'app name')
    .option('-t, --template <template>', 'template name', 'vanilla-js')
    .option('-o, --outDir <dir>', 'output directory', '.')
    .action((name, options) => {
        create(name, options.template, options.outDir);
    });

program.parse(process.argv);
