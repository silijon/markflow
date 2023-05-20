#!/usr/bin/env node

const process = require('process');
const fs = require('fs');
const browserSync = require('browser-sync');

// set current working directory to the current file's directory
process.chdir(__dirname);

// get the file to watch from the command line
const argv = require('minimist')(process.argv.slice(2));
const myFile = argv.f || argv.file;

// start browserSync
browserSync({
    server: './markflow',
    ui: false,
    files: [myFile],
    middleware: [
        {
            route: '/markdown',
            handle: function (req, res, next) {
                res.setHeader('Content-Type', 'text/plain');
                res.end(fs.readFileSync(myFile));
                next();
            }
        }
    ]
});
