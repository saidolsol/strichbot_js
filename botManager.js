var fs = require('fs');
var separator = '############################################################################\n';   
var respId = 0;
var feedback_chatId = -123161367;

function processOnText(msg, match) {
    var verbrecher = require('./verbrecher.json')
    var resp = null;
    var timestamp = new Date();
    var messagesToSend = [];
    var chatId = msg.chat.id;
    //var addierer = require('./addierer')

    fs.appendFile('logs/requests.log', separator + timestamp + '\n\n' + JSON.stringify(msg) + '\n' + separator, function (err) {
        console.log(err);
    });
    
    //setze Zeit auf 0, um nur Datum zu vergleichen
    timestamp.setHours(0,0,0,0);

    var command = match[1];
    var spieler = msg.from.username;
    //console.log('\n\n\n' + name);
    if (command === 'strich' ){
        //Spieler hat bereits eintraege...
	if (spieler in verbrecher){
            //...vom gleichen Tag...
	    if (timestamp.getTime() == Date.parse(verbrecher[spieler][1])){
                 resp='Du hast schon einen Punkt, Du Schnapsnase!';
	    //..oder von wann anders.
	    }else{
	        verbrecher[spieler][0] += 1;
	        verbrecher[spieler][1] = timestamp;
                resp = 'Strich gemacht! 🍻';

        }
        //Neue Spieler:
	}else{
	    verbrecher[spieler] = [1,timestamp];
            resp = 'Strich gemacht! 🍻';
	}
    }else if(command==='last'){
        resp = "Datum vom letzten Eintrag: " + verbrecher[spieler][1];
    }else if(command === 'start' || command === 'help'){
	resp = 'Hallo, ich bin der Strichbot! Schreib mir einfach wenn Du nen Drink hast, und ich mache ab jetzt den Strich für Dich (2018 BABY!!!). Die alten Punktesände rden übernommen. Du kannst folgendes mit mir machen\n\n/strich - Macht Deinen Strich\n/me - Zeigt Deine Anzahl Striche an';
    }else if(command==='me'){
	resp= spieler + ', Dein Aktueller Punktestand: ' + verbrecher[spieler][0].toString();
/*    }else if(command === "list"){
        for(name in verbrecher){
            resp += name + ': ' + verbrecher[name][0].toString() + '\n';
	}
        resp = JSON.stringify(verbrecher, null, 2);
        
    }
*/
    //Punktestand Abrufen OHNE Punkt zu vergeben
    /*
    }else if(name.indexOf('score') != -1){
        name = name.split(' ');
    */
    //Punkt zu bestehnder Person hinzuaddieren

    //console.log("BLABLABLABALBALABLABL\n\n"+verbrecher[name])
        
}
    fs.writeFile("./verbrecher.json", JSON.stringify(verbrecher), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
    }); 

      messagesToSend.push({chatId:chatId, message:resp, options:{parse_mode: 'Markdown'}});
    
    return messagesToSend;
}


module.exports.processOnText = processOnText;
