const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 851 });
const fs = require("fs");
const db = require("quick.db");

global.client = client;
client.commands = global.commands = [];
//#region KOMUTLAR LOAD
fs.readdir("./komutlar/", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./komutlar/${file}`);
    client.commands.push({
      name: props.name.toLowerCase(),
      description: props.description,
      options: props.options,
      type: 1,
    });
    console.log(`👌 Slash Komut Yüklendi: ${props.name}`);
  });
});
//#endregion
//#region EVENTS LOAD
fs.readdir("./events/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`👌 Event yüklendi: ${eventName}`);
    client.on(eventName, (...args) => {
      event(client, ...args);
    });
  });
});
//#endregion
//#region KOMUTLAR SET
client.on("ready", async () => {
  console.log("Aktifim!");
  client.user.setActivity("Kut Özel V13 Boş ", { type: "WATCHING" });
  const rest = new REST({ version: "10" }).setToken(process.env.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
});
//#endregion

client.login(process.env.token);
