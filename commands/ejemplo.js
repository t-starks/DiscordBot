module.exports = {
    name: 'ejemplo',
    description: 'Este es un comando con un codigo de ejemplo.',
    execute(message, args) {
        message.channel.send('Este es un comando con un codigo de ejemplo para comandos de Prefix');
    },
};
