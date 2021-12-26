const {
    MessageEmbed
} = require("discord.js");
const ms = require("ms");
const addEntry = require('../../handlers/addDBserver');
module.exports.run = (bot, message, args, con) => {
  con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
    color = row != null ? row[0].color : '#3A73A0';
    prefix = row != null ? row[0].prefix : 'p!';
    con.query(`SELECT guildMods FROM usermod WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
      row = row[0];
let row1 = rows.map(r => r.guildMods);
if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`I do not have the permission MANAGE_ROLES to execute this command!`, true);
        const usage = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(color)
            .setFooter(bot.user.username)
            .setDescription(`**Commande :**\n${prefix}unmute (membre)`)
            .addField(`Exemple:`, `${prefix}unmute <@710451944107540520>`)
            .setThumbnail(message.author.avatarURL);
            const   getMention = (message, excludeAuthor = false) =>
            message.mentions.members.first() ||
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[1])
        
            const userToMute = getMention(message, true)
            if(!userToMute) {
                var userToMutee = args[1]
            }
        if (userToMute.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return message.channel.send(`Cet utilisateur a la même position ou une position plus élevée que vous !`);
        if (userToMute.roles.highest.rawPosition >= message.guild.me.roles.highest.rawPosition) return message.channel.send(`Cet utilisateur a la même position ou une position plus élevée que moi !`);
        con.query(`SELECT muteRole FROM guildSettings WHERE guildId ="${message.guild.id}"`, (e, muteRole) => {
            muteRole = muteRole[0];
            const check = message.guild.roles.cache.find(c => c.name == muteRole.muteRole);
            if (!check) return message.channel.send(`Impossible de trouver le rôle (${muteRole.muteRole}). Pour changer utiliser ${prefix}logs`, true);
            if (check.position >= message.member.roles.highest.rawPosition) return message.channel.send(`Ce rôle a la même position ou une position plus élevée que vous !`);
            if (check.position >= message.guild.me.roles.highest.position) return message.channel.send(`Ce rôle a la même position ou une position plus élevée que moi !`);
            if (!userToMute.roles.cache.filter(r => r.name == check.name).size > 0) return message.channel.send(`Cet utilisateur est déjà unmute !`);
            userToMute.roles.remove(check, `UnMute par ${message.author.username}`);
            message.channel.send(`L'utilisateur a été unmute avec succès !`);
            con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                const LogsEmbed = new MessageEmbed()
                    .setTitle(`:mute: Membre UnMute :mute:`)
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .addField(`Membre unmute:`, userToMute.user.username)
                    .addField(`UnMute par:`, message.author.username)
                    .addField(`UnMute le:`, new Date().toDateString())
                    .addField(`Message:`, `[JumpTo](${message.url})`)
                    .setColor(color)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter(bot.user.username);
                if (row.serverLogs !== "true") return;
                message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
            });
        });
    });
  })
};

module.exports.config = {
    name: "unmute",
    aliases: ["umt"],
    usage: "Réautorise le droit de parole d'un utilisateur.",
    commandCategory: "moderation",
    cooldownTime: '0'
};