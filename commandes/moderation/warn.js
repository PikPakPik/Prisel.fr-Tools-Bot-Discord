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
        const reason = args.slice(1).join(` `);
        if (!reason) return message.channel.send(`Vous n'avez pas précisé de raison !`);
        if(userToWarn) {
          if (userToWarn.id == message.author.id) return message.channel.send(`Vous pouvez pas vous warn dommage pour vous !`);
        if (userToWarn.user.bot) return message.channel.send(`Warn un bot ? Pardon ?`);
        if (userToWarn.highestRole.position >= message.member.highestRole.position) return message.channel.send(`Vous ne pouvez pas warn ce membre. Il a la même position que vous, ou une position supérieure.`);
          con.query(`SELECT * FROM userWarns WHERE userWarns.guildId = "${message.guild.id}" AND userId = "${userToWarn.id}"`, (e, warns) => {
            if (warns !== undefined && warns.length >= 20) return message.channel.send(`User has too many warns (20). Please consider deleting some and try again.`);
            con.query(`SELECT * FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarn.id}"`, (e, row) => {
                if (!row || row.length == 0) {
                    con.query(`INSERT INTO userWarns (guildId, userId, warning, warnedAt, warnedBy, username, warnCount) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.guild.id, userToWarn.id, reason, new Date().toDateString(), message.author.tag, userToWarn.user.username, 1]);
                } else {
                    con.query(`INSERT INTO userWarns (guildId, userId, warning, warnedAt, warnedBy, username, warnCount) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.guild.id, userToWarn.id, reason, new Date().toDateString(), message.author.tag, userToWarn.user.username, row.length + 1]);
                }
            });
            con.query(`SELECT * FROM userPunishments WHERE guildId ="${message.guild.id}" AND userId ="${userToWarn.id}"`, async (e, row) => {
                if (row.length == 0) {
                    addEntry.addDbEntryUserId(message.guild.id, userToWarn.id, 'warn');
                } else {
                    row = row[0];
                    con.query(`UPDATE userPunishments SET warnings = ${row.warnings + 1} WHERE guildId = ${message.guild.id} AND userId = ${userToWarn.id}`);
                }
            });
            message.channel.send(`L'utilisateur à bien été warn pour ${reason}!`);
            con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                row = row[0];
                const LogsEmbed = new MessageEmbed()
                    .setTitle(`:warning: Membre Warn :warning:`)
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .addField(`Membre warn:`, userToWarn.user.username)
                    .addField(`Warn par:`, message.author.username)
                    .addField(`Warn à:`, new Date().toDateString())
                    .addField(`Raison:`, reason)
                    .addField(`Message:`, `[JumpTo](${message.url})`)
                    .setColor(color)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter(bot.user.username);
                if (row.serverLogs !== "true") return;
                message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
            });
        });
        } else {
          con.query(`SELECT * FROM userWarns WHERE userWarns.guildId = "${message.guild.id}" AND userId = "${userToWarnn}"`, (e, warns) => {
            if (warns !== undefined && warns.length >= 20) return message.channel.send(`User has too many warns (20). Please consider deleting some and try again.`);
            con.query(`SELECT * FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarnn}"`, (e, row) => {
                if (!row || row.length == 0) {
                    con.query(`INSERT INTO userWarns (guildId, userId, warning, warnedAt, warnedBy, username, warnCount) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.guild.id, userToWarnn, reason, new Date().toDateString(), message.author.tag, "ID", 1]);
                } else {
                    con.query(`INSERT INTO userWarns (guildId, userId, warning, warnedAt, warnedBy, username, warnCount) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.guild.id, userToWarnn, reason, new Date().toDateString(), message.author.tag, "ID", row.length + 1]);
                }
            });
            con.query(`SELECT * FROM userPunishments WHERE guildId ="${message.guild.id}" AND userId ="${userToWarnn}"`, async (e, row) => {
                if (row.length == 0) {
                    addEntry.addDbEntryUserId(message.guild.id, userToWarnn, 'warn');
                } else {
                    row = row[0];
                    con.query(`UPDATE userPunishments SET warnings = ${row.warnings + 1} WHERE guildId = ${message.guild.id} AND userId = ${userToWarnn}`);
                }
            });
            message.channel.send(`L'utilisateur à bien été warn pour ${reason}!`);
            con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                row = row[0];
                const LogsEmbed = new MessageEmbed()
                    .setTitle(`:warning: Membre Warn :warning:`)
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .addField(`Membre warn:`, userToWarnn)
                    .addField(`Warn par:`, message.author.username)
                    .addField(`Warn à:`, new Date().toDateString())
                    .addField(`Raison:`, reason)
                    .addField(`Message:`, `[JumpTo](${message.url})`)
                    .setColor(color)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter(bot.user.username);
                    if (row.serverLogs !== "true") return;
                    message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
            });
        });
        }
      })
    });
};

module.exports.config = {
    name: "warn",
    aliases: ["w"],
    description: "Avertir un utilisateur",
    usage: "<id / mention>",
    commandCategory: "moderation",
    cooldownTime: '0'
};