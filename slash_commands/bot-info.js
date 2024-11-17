const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Muestra la informacion del bot 🤖'),
    async execute(interaction) {

        // Asegúrate de que los datos del propietario estén disponibles
        await interaction.client.application.fetch();
        const botOwner = interaction.client.application.owner;
        let ownerMention;
        if (botOwner.members) {
            // Si el bot pertenece a un equipo
            ownerMention = botOwner.members
                .map(member => `<@${member.user.id}>`)
                .join(', ') || 'Propietario desconocido';
        } else {
            // Si el bot tiene un único propietario
            ownerMention = `<@${botOwner.id}>`;
        }
        const botUser = interaction.client.user;
        const totalServers = interaction.client.guilds.cache.size;
        const totalMembers = interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const roles = interaction.guild.members.cache.get(botUser.id).roles.cache
            .filter(role => role.name !== '@everyone') // Excluir el rol @everyone
            .map(role => `<@&${role.id}>`) // Convertir los IDs de los roles a menciones
            .join(', ') || 'No roles';

        const embed = new Discord.EmbedBuilder()
            .setTitle('🪪 Informacion del Bot')
            .setThumbnail(botUser.displayAvatarURL({ dynamic: true }))
            .setColor('Aqua')
            .addFields(
                { name: '🤖 Nombre:', value: botUser.tag, inline: true },
                { name: '⚙️ ID:', value: botUser.id, inline: true },
                { name: '📅 Creación:', value: `<t:${parseInt(botUser.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '👨‍💻 Propietario', value: ownerMention, inline: true },
                { name: '🗺️ Servidores:', value: totalServers.toString(), inline: true },
                { name: '👥 Usuarios:', value: totalMembers.toString(), inline: true },
                { name: '📌 Roles del Bot:', value: roles, inline: true }
            );
        await interaction.reply({ embeds: [embed] });
    },
};
