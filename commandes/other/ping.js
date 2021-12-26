const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const ms = require("ms");

module.exports.run = (bot, message, args, con) => {
  con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
    color = row != null ? row[0].color : '#3A73A0';
    const embed = new MessageEmbed()
    .setColor(color)
    .setTitle("Ping")
    .addField(":clock: Ping:", `${Math.round(bot.ws.ping)}ms`)
    .addField(`:robot: Uptime:`, `${ms(bot.uptime)}`);
  message.channel.send(embed);
  })
};

module.exports.config = {
  name: "ping",
  aliases: ["pong"],
  usage: "Avoir la latence du bot.",
  commandCategory: "other"
};