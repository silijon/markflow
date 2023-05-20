#!/usr/bin/env node

var fs = require('fs');
var browserSync = require('browser-sync');

var argv = require('minimist')(process.argv.slice(2));
var myFile = argv.f || argv.file;

browserSync({
    server: 'markflow',
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
