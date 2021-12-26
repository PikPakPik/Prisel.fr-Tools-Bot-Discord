const { MessageEmbed } = require("discord.js");
module.exports.run = (bot, message, args, con) => {
  con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
    color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT guildMods FROM userown WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
        row = rows[0];
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
          con.query(`SELECT * FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarn.id}"`, (e, rows) => {
            if (!rows || rows.length == 0) return message.channel.send(`User has no warnings!`);
                        con.query(`DELETE FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarn.id}"`);
                        message.channel.send(`Tous les warns de ${userToWarn} ont été supprimés`, false);
                        con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                          row = row[0];
                          const LogsEmbed = new MessageEmbed()
                              .setTitle(`:warning: Clear Warn :warning:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Clear Warn:`, userToWarn.user.username)
                              .addField(`Clear par:`, message.author.username)
                              .addField(`Clear à:`, new Date().toDateString())
                              .addField(`Message:`, `[JumpTo](${message.url})`)
                              .setColor(color)
                              .setThumbnail(message.author.avatarURL)
                              .setFooter(bot.user.username);
                          if (row.serverLogs !== "true") return;
                          message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                      });

        });
        } else {
          con.query(`SELECT * FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarnn}"`, (e, rows) => {
            if (!rows || rows.length == 0) return message.channel.send(`User has no warnings!`);
                        con.query(`DELETE FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarnn}"`);
                        message.channel.send(`Tous les warns de ${userToWarnn} ont été supprimés`, false);
                        con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                          row = row[0];
                          const LogsEmbed = new MessageEmbed()
                              .setTitle(`:warning: Clear Warn :warning:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Clear Warn:`, userToWarnn)
                              .addField(`Clear par:`, message.author.username)
                              .addField(`Clear à:`, new Date().toDateString())
                              .addField(`Message:`, `[JumpTo](${message.url})`)
                              .setColor(color)
                              .setThumbnail(message.author.avatarURL)
                              .setFooter(bot.user.username);
                          if (row.serverLogs !== "true") return;
                          message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                      });

        });
        }
    });
  })
};

module.exports.config = {
    name: "clearwarn",
    aliases: ["cw"],
    description: "Gère les avertissements d'un utilisateur.",
    usage: "<id / mention>",
    commandCategory: "moderation",
    cooldownTime: '0'
};