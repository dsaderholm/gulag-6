/***************
 * node-unblocker: Web Proxy for evading firewalls and content filters,
 * similar to CGIProxy or PHProxy
 *
 *
 * This project is hosted on github:  https://github.com/829qqvsvchwj/node-unblocker-heroku/
 *
 * By https://github.com/829qqvsvchwj/
 * Based on sources from https://github.com/nfriedly/node-unblocker/
 * Released under the terms of the GPL v3
 */
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var unblocker = require('unblocker');
var Transform = require('stream').Transform;

var app = express();

var unblockerConfig = {
    prefix: '/main/',
};



// this line must appear before any express.static calls (or anything else that sends responses)
app.use(unblocker(unblockerConfig));

// serve up static files *after* the proxy is run
app.use('/', express.static(__dirname + '/public'));

// this is for users who's form actually submitted due to JS being disabled or whatever
app.get("/no-js", function(req, res) {
    // grab the "url" parameter from the querystring
    var site = querystring.parse(url.parse(req.url).query).url;
    // and redirect the user to /proxy/url
    res.redirect(unblockerConfig.prefix + site);
});

// for compatibility with gatlin and other servers, export the app rather than passing it directly to http.createServer
module.exports = app;
