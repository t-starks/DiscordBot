// Desarrollado por T. Stark
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = async (message) => {
    const commandsDir = path.join(__dirname);
    const files = fs.readdirSync(commandsDir);
    const commands = files
        .filter(file => file.endsWith('.js'))
        .map(file => {
            const command = require(path.join(commandsDir, file));
            return { name: path.basename(file, '.js'), description: command.description || 'Sin descripción' };
        });

    const embed = new EmbedBuilder()
        .setTitle('Lista de comandos')
        .setColor('#3498db')
        .setThumbnail('https://i.pinimg.com/originals/ab/92/7f/ab927f5881b35e3d1952619759ff3b32.png')
        .setTimestamp();

    commands.forEach(cmd => {
        embed.addFields({ name: cmd.name, value: cmd.description, inline: true });
    });

    await message.channel.send({ embeds: [embed] });
    message.delete();
};

module.exports.description = 'Muestra la lista de comandos disponibles.';
