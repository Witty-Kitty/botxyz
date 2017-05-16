var restify = require('restify');
var builder = require('botbuilder');

    //=========================================================
    // Bot Setup
    //=========================================================

    // Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 4040, function () {
       console.log('%s listening to %s', server.name, server.url);
    });

    // Create chat bot
var connector = new builder.ChatConnector({
       appId: process.env.MICROSOFT_APP_ID,
       appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});


server.get(/.*/, restify.serveStatic({ 'directory': '.', 'default': 'index.html' }));
