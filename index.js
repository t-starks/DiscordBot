// Desarrollado por T. Stark
const config = require('./config.json');
const Discord = require('discord.js');
const TStark = require('t-stark');
const fs = require('fs');

const client = new Discord.Client({
    intents: [53608447]
});

client.on('ready', () => {
    TStark.showReady(client);
    TStark.presence(client, 4, "Developed By: T. Stark!");
    TStark.initializeBot(client);
});

// handler de eventos
fs.readdirSync("./events")
    .filter((filename) => filename.endsWith(".js"))
    .forEach((filename) => {
        try {
            const listener = require(`./events/${filename}`);
            const eventName = path.basename(filename, ".js");

            client.on(eventName, listener);
        } catch (err) {
        console.log("[err] Ha ocurrido un error al cargan un evento", err);
    }
});

client.login(config.token);