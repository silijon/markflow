#!/usr/bin/env node

import path from 'path';
import {fileURLToPath} from 'url';
import meow from 'meow';
import process from 'process';
import fs from 'fs';
import browserSync from 'browser-sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cli = meow(`
    Usage   
        $ markflow <markdown-file>

    Options
        --help, -h   Show this help
        --port, -p   Port to use for the server
        --watch, -w  Keep watching the file and sync changes to the browser

    Example
        $ markflow README.md
`, {    
    importMeta: import.meta,
    flags: {
        help: {
            shortFlag: 'h'
        },
        port: {
            shortFlag: 'p',
            type: 'number',
            default: 3000
        },
        watch: {
            shortFlag: 'w',
            type: 'boolean',
            default: false
        }
    }
});

// if there is no markdown file given, show help
if (!cli.input.length) {
    cli.showHelp();
}

// resolve absolute path from given markdown file
const mdFileAbs = path.resolve(cli.input.at(0));

// set current working directory to the current file's directory
process.chdir(__dirname);

const watch = cli.flags.watch;

// start browserSync
const bs = browserSync({
    server: 'markflow',
    port: cli.flags.port,
    ui: false,
    files: watch ? [mdFileAbs] : [],
    logSnippet: watch,
    notify: watch,
    ghostMode: watch,
    middleware: [
        {
            route: '/markdown',
            handle: function (req, res, next) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    location: mdFileAbs,
                    text: fs.readFileSync(mdFileAbs).toString()
                }));
                next();
            }
        }
    ]
}, () => {
    if (!watch) {
        // give the browser a moment to load the page and fetch the markdown
        // before tearing down the server and exiting
        setTimeout(() => {
            bs.exit();
            process.exit(0);
        }, 1500);
    }
});
