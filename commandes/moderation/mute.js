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
            .setDescription(`**Commande :**\n${prefix}mute (membre) (le temps suivi par s (secondes), m (minutes), h (heures) ou d (jours)) (raison optionnel)`)
            .addField(`Exemple:`, `${prefix}mute <@710451944107540520> 10h spam`)
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
        const time = args[1];
        if (!time) return message.channel.send(usage);
        if (!time.endsWith("s") && !time.endsWith("m") && !time.endsWith("h") && !time.endsWith("d")) return message.channel.send(`Not a valid time! (doesn't end in s, m, h, or d)`);
        const actualTime = parseInt(ms(time));
        if (parseInt(actualTime) < parseInt(ms("10s"))) return message.channel.send(`Le temps ne peut pas minimum à 10s.`);
        const reason = args.slice(2).join(` `) || "Non-défini.";
        con.query(`SELECT muteRole FROM guildSettings WHERE guildId ="${message.guild.id}"`, (e, muteRole) => {
            muteRole = muteRole[0];
            const check = message.guild.roles.cache.find(c => c.name == muteRole.muteRole);
            if (!check) return message.channel.send(`Could not find the role that is currently set as the muted role (${muteRole.muteRole}). To edit it, use guildSettings.`, true);
            if (check.position >= message.member.roles.highest.rawPosition) return message.channel.send(`Ce rôle a la même position ou une position plus élevée que vous !`);
            if (check.position >= message.guild.me.roles.highest.position) return message.channel.send(`Ce rôle a la même position ou une position plus élevée que moi !`);
            if (userToMute.roles.cache.filter(r => r.name == check.name).size > 0) return message.channel.send(`Cet utilisateur est déjà mute !`);
            userToMute.roles.add(check, `Mute par ${message.author.username}`);
            setTimeout(() => {
                userToMute.roles.remove(check, `Unmute time`).catch(() => { });
                message.channel.send(`UnMute ${userToMute.user.username} après ${ms(actualTime)}`);
            }, actualTime);
            message.channel.send(`L'utilisateur a été mis muet avec succès !`);
            con.query(`SELECT * FROM userPunishments WHERE guildId ="${message.guild.id}" AND userId ="${userToMute.id}"`, async (e, row) => {
                if (row.length == 0) {
                    addEntry.addDbEntryUserId(message.guild.id, userToMute.id, 'mute');
                } else {
                    row = row[0];
                    con.query(`UPDATE userPunishments SET mutes = ${row.mutes + 1} WHERE guildId = ${message.guild.id} AND userId = ${userToMute.id}`);
                }
            });
            con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                const LogsEmbed = new MessageEmbed()
                    .setTitle(`:mute: Membre Mute :mute:`)
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .addField(`Membre muet:`, userToMute.user.username)
                    .addField(`Mute par:`, message.author.username)
                    .addField(`Mute le:`, new Date().toDateString())
                    .addField(`Raison:`, reason)
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
    name: "mute",
    aliases: ["mt"],
    description: "Coupe le droit de parole d'un utilisateur.",
    usage: "<id / mention>",
    commandCategory: "moderation",
    cooldownTime: '0'
};