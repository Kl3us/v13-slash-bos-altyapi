const { Client, CommandInteraction } = require("discord.js");

module.exports = {

  name: "Ping",
  description: 'Api İle Arasındaki Gecikmeyi Gösterir',
  type: 1,
  options: [],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    interaction.reply(`${client.ws.ping} Ms`)
  }
}; 
