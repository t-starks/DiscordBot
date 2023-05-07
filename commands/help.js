const fs = require("fs");

module.exports = async (message) => {
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  const commandList = commandFiles.map((file) => {
    const command = require(`./${file}`);
    return command.name;
  });

  const embed = {
    title: "Lista de comandos",
    description: `Aquí tienes una lista de los comandos disponibles: ${commandList.join(
      ","
    )}`,
    color: 0x00ff00,
  };

  message.reply({ embeds: [embed] });
};
