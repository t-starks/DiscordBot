// Desarrollado por T. Stark
module.exports = {
    name: 'avatar',
    description: 'Muestra el avatar del usuario mencionado o el tuyo.',
    async execute(message, args) {
        const user = message.mentions.users.first() || message.author;

        const embed = {
            description: `Avatar de ${user.username}`,
            image: { url: user.displayAvatarURL({ dynamic: true, size: 1024 }) }
        };

        await message.reply({ embeds: [embed] });
    }
};