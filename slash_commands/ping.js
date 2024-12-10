// Desarrollado por T. Stark
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('🏓 Responde con Pong!'),
    async execute(interaction) {
        try {
            const embed = new Discord.EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Pong! 🏓')
                .setDescription(`Latencia de la API: **${Math.round(interaction.client.ws.ping)}ms** 📶`);

            // Responder con el embed
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error ejecutando el comando /ping:', error);
            await interaction.reply({ content: 'Hubo un error al ejecutar el comando.', ephemeral: true });
        }
    },
};
