const { MessageEmbed } = require("discord.js");
const addEntry = require('../../handlers/addDBserver');

module.exports.run = (bot, message, args, con) => {
    con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
      color = row != null ? row[0].color : '#3A73A0';
    con.query(`SELECT guildMods FROM usermod WHERE guildId ="${message.guild.id}"`, (e, rows) => {
        let row1 = rows.map(r => r.guildMods);
        if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);

        const   getMention = (message, excludeAuthor = false) =>
          message.mentions.members.first() ||
          message.mentions.users.first() ||
          message.guild.member(args[0])

          if(!args[0]) return message.reply("Merci de mentionnez ou de mettre l'id")
      
          const userToWarn = getMention(message, true)
          if(!userToWarn) {
              var userToWarnn = args[0]
          }
        if(userToWarn) {
          if(!args[1]) return message.reply("Merci de mettre le numéro du warn")
          con.query(`SELECT u.userId FROM userWarns AS u WHERE (u.guildId="${message.guild.id}" AND u.userId="${userToWarn.id}" AND u.warnCount="${args[1]}")`, (err, rows) => { 
            if(err) throw err;
            if(rows.length) {  
                con.query(`DELETE FROM userWarns WHERE (guildId="${message.guild.id}" AND userId="${userToWarn.id}" AND warnCount="${args[1]}")`);
                con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                  row = row[0];
                  const LogsEmbed = new MessageEmbed()
                    .setTitle(`:warning: Membre UnWarn :warning:`)
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .addField(`Membre unwarn:`, userToWarn)
                    .addField(`UnWarn par:`, message.author.username)
                    .addField(`UnWarn à:`, new Date().toDateString())
                    .addField(`Message:`, `[JumpTo](${message.url})`)
                    .setColor(color)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter(bot.user.username);
                    if (row.serverLogs !== "true") return;
                    message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                });
                con.query(`SELECT * FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarn.id}"`, (e, rows) => {
                return message.channel.send(`Le Warn n°${args[1]} de ${userToWarn.user.username} à bien été retiré il à désormai ${rows.length} warn(s)`);
                })
            } else {  
                return message.channel.send(`${userToWarn.user.username} n'a pas de warn n°${args[1]}`);
            }
          });
        } else {
          if(!args[1]) return message.reply("Merci de mettre le numéro du warn")
          con.query(`SELECT u.userId FROM userWarns AS u WHERE (u.guildId="${message.guild.id}" AND u.userId="${userToWarnn}" AND u.warnCount="${args[1]}")`, (err, rows) => { 
            if(err) throw err;
            if(rows.length) {  
              con.query(`DELETE FROM userWarns WHERE (guildId="${message.guild.id}" AND userId="${userToWarnn}" AND warnCount="${args[1]}")`);
              con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                row = row[0];
                const LogsEmbed = new MessageEmbed()
                    .setTitle(`:warning: Membre UnWarn :warning:`)
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .addField(`Membre unwarn:`, userToWarnn)
                    .addField(`UnWarn par:`, message.author.username)
                    .addField(`UnWarn à:`, new Date().toDateString())
                    .addField(`Message:`, `[JumpTo](${message.url})`)
                    .setColor(color)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter(bot.user.username);
                    if (row.serverLogs !== "true") return;
                    message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
              });
              con.query(`SELECT * FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarnn}"`, (e, rows) => {
              return message.channel.send(`Le Warn n°${args[1]} de ${userToWarnn} à bien été retiré il à désormai ${rows.length} warn(s)`);
              })
          } else {  
            return message.channel.send(`${userToWarnn} n'a pas de warn n°${args[1]}`);
          }
          });
        }
    })
  })
}

module.exports.config = {
    name: "unwarn",
    aliases: ["unwarn", "uw"],
    description: "Enlever un avertissement d'un utilisateur.",
    usage: "<id / mention>",
    commandCategory: "moderation",
    cooldownTime: '0'
};