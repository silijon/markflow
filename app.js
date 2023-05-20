#!/usr/bin/env node

const process = require('process');
const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync');

// get the file to watch from the command line
const argv = require('minimist')(process.argv.slice(2));

// resolve absolute path from myFile
const mdFileAbs = path.resolve(argv._[0]);
console.log(mdFileAbs);

// set current working directory to the current file's directory
process.chdir(__dirname);

// start browserSync
browserSync({
    server: './markflow',
    ui: false,
    files: [mdFileAbs],
    middleware: [
        {
            route: '/markdown',
            handle: function (req, res, next) {
                res.setHeader('Content-Type', 'text/plain');
                res.end(fs.readFileSync(mdFileAbs));
                next();
            }
        }
    ]
});
