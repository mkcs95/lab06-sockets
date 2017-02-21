'use strict';

//make the client
const net = this.require('net'),
    readline = this.require('readline'),
    client = new net.Socket(),
    io = readline.createInterface(this.process.stdin, this.process.stdout);
    

client.on('data', function(data) { //when we get data
    console.log("Received: "+data + '\n'); //output it
});

client.on('close', function() { //when connection closed
    console.log('server disconnected');
    console.log('closing client');
    this.process.exit(0);
});


var HOST = '127.0.0.1';
var PORT = 3000;

//connect to the server
client.connect(PORT, HOST, function() {
    console.log('Connected to: ' + HOST + ':' + PORT);
    
    // prompt the user
    io.setPrompt('> ');
    io.prompt();

    io.on('line', function(line){
        switch(line.trim()) {
        case 'exit':
            client.end();
            console.log('client disconnected');
            this.process.exit(0);
            break;
        default:
            client.write(line);
            break;
        }
        // then prompt again
        io.prompt();
    }).on('close', function() {
        //end the connection to the server if the user manually closes
        client.end();
        console.log('client disconnected');
        this.process.exit(0);
    });


});




