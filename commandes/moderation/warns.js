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
          const embed = new MessageEmbed()
            .setTitle(`${userToWarn.user.username} warns`)
            .setColor(color)
            .setThumbnail(userToWarn.user.avatarURL);
        con.query(`SELECT * FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarn.id}"`, (e, rows) => {
            let n = 0;
            if (!rows || rows.length == 0) return message.channel.send(`User has no warns.`, true);
            rows.forEach(row => {
                embed.addField(`Warn n°${row.warnCount}:`, `**Raison du warn:** ${row.warning}\n**Warn par:** ${row.warnedBy}\n**Warn le:** ${row.warnedAt}`);
            });
            embed.setDescription(`Nombre de warn: ${rows.length}`);
            message.channel.send(embed);
        });
        } else {
          const embed = new MessageEmbed()
            .setTitle(`${userToWarnn} warns`)
            .setColor(color)
        con.query(`SELECT * FROM userWarns WHERE guildId = "${message.guild.id}" AND userId = "${userToWarnn}"`, (e, rows) => {
            let n = 0;
            if (!rows || rows.length == 0) return message.channel.send(`User has no warns.`, true);
            rows.forEach(row => {
              embed.addField(`Warn n°${n += 1}:`, `**Raison du warn:** ${row.warning}\n**Warn par:** ${row.warnedBy}\n**Warn le:** ${row.warnedAt}`);
            });
            embed.setDescription(`Nombre de warn: ${rows.length}`);
            message.channel.send(embed);
        });
        }
      })
    });
};

module.exports.config = {
    name: "warns",
    aliases: ["ws"],
    description: "Voir les avertissements de l'utilisateur",
    usage: "<id / mention>",
    commandCategory: "moderation",
    cooldownTime: '0'
};