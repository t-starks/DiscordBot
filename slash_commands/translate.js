const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate a message from one language to another')
        .addStringOption(option => option.setName('msg').setDescription('Place your message').setRequired(true))
        .addStringOption(option => option.setName('lang').setDescription('Language you want to translate to').addChoices(
            { name: 'English', value: 'en'},
            { name: 'Spanish', value: 'es'},
        ).setRequired(true)),
    async execute(interaction) {
        const { options } = interaction;
        const text = options.getString('msg');
        const lan = options.getString('lang');
        await interaction.reply({ content: `⏳ Loading ...`, ephermal: true});
        const applied = await translate(text, { to: `${lan}`})

        const embed = new Discord.EmbedBuilder()
            .setTitle('💬 Translation')
            .setThumbnail('https://tinyurl.com/27olqdzv')
            .addFields({ name: `📤 Original Message:`, value: `\`\`\`${text}\`\`\``, incline: false})
            .addFields({ name: `📥 Translated Message:`, value: `\`\`\`${applied.text}\`\`\``, incline: false})
            .setFooter({
                text: `Sent By ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp()
            .setColor('Blurple');

        await interaction.editReply({ content: `Text Translated to **${lan}**`, embeds: [embed], ephermal: true})
    }
};
