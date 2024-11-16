const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('random')
        .setDescription('Generate a random number between 1 and 100'),
    async execute(interaction) {
        const randomNum = Math.floor(Math.random() * 100);
        interaction
        .reply(`Tu numero aleatorio es: ${randomNum}`)
        .catch(console.error);
    }
};
