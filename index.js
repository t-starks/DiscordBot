const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');

const Client = new Discord.Client({
    intents: [53608447]
});

Client.on('ready', async (client) => {
    console.clear()
    console.log(`
  _____   ____  _             _    
 |_   _| / ___|| |_ __ _ _ __| | __
   | |   \\___ \\| __/ _\` | '__| |/ /
   | |_   ___) | || (_| | |  |   < 
   |_(_) |____/ \\__\\__,_|_|  |_|\\_\\
===========================================
✅ Developed by: https://t-stark.netlify.app
🤖 Online: ${client.user.tag} | 📶 ${Client.commands.size} slash commands {/}
👨🏻‍💻 Other Tools: https://starkcompany.netlify.app
===========================================
    `);
    client.user.setActivity('Developed by T. Stark.', { type: 3 });
});

// Comandos {!}
Client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('-')) return; //Prefix del bot - Puedes cambiarlo por (, . - _ $ + & ! ?) como prefijos para el bot

    try {
        const command = message.content.toLowerCase().slice(1).split(' ')[0];
        console.log(command);
        const commandexecute = require(`./commands/${command}.js`);
        await commandexecute(message);
    } catch (error) {
        console.log(`${message.content} no es un comando valido.`);
    }
});

// Comandos {/}
Client.commands = new Discord.Collection();

fs.readdirSync("./slash_commands").forEach((commandfile) => {
    const command = require(`./slash_commands/${commandfile}`);
    if (command.data && command.data.name) {
        Client.commands.set(command.data.name, command);
    } else {
        console.log(`El comando en ${commandfile} no tiene la propiedad 'data.name'.`);
    }
});

// interactionCreate
Client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    
        const command = Client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hubo un error al ejecutar ese comando.', ephemeral: true });
        }
    }
);

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
    try {
        // Registra los comandos globales
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: Client.commands.map(command => command.data.toJSON()) }
        );
        console.log(`Loaded ${Client.commands.size} slash commands {/}.`);
    } catch (error) {
        console.error("Error loading commands.", error);
    }
})();

// handler de eventos
fs.readdirSync("./events")
    .filter((filename) => filename.endsWith(".js"))
    .forEach((filename) => {
        try {
            const listener = require(`./events/${filename}`);
            const eventName = path.basename(filename, ".js");

            Client.on(eventName, listener);
        } catch (err) {
        console.log("[err] Ha ocurrido un error al cargan un evento", err);
    }
});

Client.login(config.token);
