const { MessageEmbed } = require("discord.js");
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
          if (userToWarn.user.bot) return message.channel.send(`Il n'y a pas de casier pour les bots.`);
          con.query(`SELECT * FROM userPunishments WHERE guildId ="${message.guild.id}" AND userId ="${userToWarn.id}"`, (e, row) => {
            if (e) {
                console.log(e);
                con.query(`CREATE TABLE IF NOT EXISTS userPunishments (guildId TEXT, userId TEXT, warnings INTEGER, kicks INTEGER, mutes INTEGER, bans INTEGER, reports INTEGER)`);
                con.query(`INSERT INTO userPunishments (guildId, userId, warnings, kicks, mutes, bans, reports) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.guild.id, userToWarn.id, 0, 0, 0, 0, 0]);
                return message.channel.send(`User has no punishments!`);
            }
            if (row.length == 0) {
                con.query(`INSERT INTO userPunishments (guildId, userId, warnings, kicks, mutes, bans, reports) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.guild.id, userToWarn.id, 0, 0, 0, 0, 0]);
                return message.channel.send(`User has no punishments!`);
            } else {
                row = row[0];
                const embed = new MessageEmbed()
                    .setColor(color)
                    .setFooter(bot.user.username)
                    .setTitle(`Casier de ${userToWarn.user.username}`)
                    .setDescription(`**Bans:** ${row.bans}\n**Kicks:** ${row.kicks}\n**Reports:** ${row.reports}\n**Warns:** ${row.warnings}\n**Mutes:** ${row.mutes}`)
                    .setThumbnail(userToWarn.user.avatarURL);
                message.channel.send(embed);
            }
        });
        } else {
          con.query(`SELECT * FROM userPunishments WHERE guildId ="${message.guild.id}" AND userId ="${userToWarnn}"`, (e, row) => {
            if (e) {
                console.log(e);
                con.query(`CREATE TABLE IF NOT EXISTS userPunishments (guildId TEXT, userId TEXT, warnings INTEGER, kicks INTEGER, mutes INTEGER, bans INTEGER, reports INTEGER)`);
                con.query(`INSERT INTO userPunishments (guildId, userId, warnings, kicks, mutes, bans, reports) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.guild.id, userToWarnn, 0, 0, 0, 0, 0]);
                return message.channel.send(`User has no punishments!`);
            }
            if (row.length == 0) {
                con.query(`INSERT INTO userPunishments (guildId, userId, warnings, kicks, mutes, bans, reports) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.guild.id, userToWarnn, 0, 0, 0, 0, 0]);
                return message.channel.send(`User has no punishments!`);
            } else {
                row = row[0];
                const embed = new MessageEmbed()
                    .setColor(color)
                    .setFooter(bot.user.username)
                    .setTitle(`Casier de ${userToWarnn}`)
                    .setDescription(`**Bans:** ${row.bans}\n**Kicks:** ${row.kicks}\n**Reports:** ${row.reports}\n**Warns:** ${row.warnings}\n**Mutes:** ${row.mutes}`)
                message.channel.send(embed);
            }
        });
        }
      })
    });
};

module.exports.config = {
    name: "casier",
    aliases: ["cas"],
    description: "Vous permet de voir les punitions qu'un utilisateur a subies.",
    usage: "<id / mention>",
    commandCategory: "moderation",
    cooldownTime: '0'
};