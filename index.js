// Requerimientos
const Discord = require('discord.js');
//Cliente
const client = new Discord.Client({ intents: 3276799 });

// CONTENIDO
//********** */
client.on('ready', async ( client ) => {
  console.log(`${client.user.tag}! Listo.`);
  client.user.setActivity("Tomorrowland Fest");
});

client.on(`messageCreate`, async ( message ) => {
  if(message.author.bot) return;
  if(!message.content.startsWith('!')) return;

  try {
    const command = message.content.toLowerCase().slice(1).split(' ')[0];
    console.log(command)
    const executeCommand = require(`./commands/${command}.js`);
    executeCommand( message );
  } catch (error) {
    console.log(`${message.content} no es un comando valido.`)
  }
});

// Conectar Bot
const config = require('./config.json');
client.login(config.token);
