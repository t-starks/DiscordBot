module.exports = async ( message ) => {
    const user = message.mentions.users.first() || message.author;

    const embed = {
        description: `Avatar de ${user.username}`,
        image: {url: user.displayAvatarURL({ dynamic: true, size: 1024 })}
    };
    message.reply({embeds: [embed]})
};
