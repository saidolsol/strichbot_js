var TelegramBot = require('node-telegram-bot-api'); 
var fs = require('fs');
var botManager = require('./botManager')
var variables = require('./variables');

var token = variables.token;

var bot = new TelegramBot(token, {polling: true});



bot.onText(/\/(.+)/, function (msg, match) {
    var messageToSend = botManager.processOnText(msg, match);
    
    console.log(messageToSend);
    
    for(var i=0;i<messageToSend.length;i++) {
        
        var message = messageToSend[i];
        
        console.log(message);
        
        bot.sendMessage(message.chatId, message.message, message.options).then(function(message) {
            console.log('Message sent');
            i++;
        }, function(error) {
            console.log('Error: ' + error);
            i++;
        });
    }
});



