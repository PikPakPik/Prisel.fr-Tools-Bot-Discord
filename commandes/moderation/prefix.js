const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, con) => {
    try {
        con.query(`SELECT gs.serverLogs, gp.prefix, gs.serverlogsChannel FROM guildSettings as gs LEFT JOIN Bot AS gp WHERE gs.guildId ="${message.guild.id}"`, (e, row) => {
          con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
            color = row != null ? row[0].color : '#3A73A0';
                con.query(`SELECT guildMods FROM userown WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
                row = rows[0];
                let row1 = rows.map(r => r.guildMods);
                if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
                let prefix = args.join(` `);
                if (!prefix) return message.channel.send(`C'est vide... Comment tu veux je le change ?`);
                let newprefix = prefix.replace(/[^\x00-\x7F]/g, "");
                if (newprefix.length < 1) message.channel.send(`Ton prefix est trop court.`);
                if (newprefix.length > 7) return message.channel.send(`Ton prefix est trop long.`);
                if (row.prefix == newprefix) return message.channel.send(`Ce préfix ${newprefix} est déjà défini sur le serveur.`);
                con.query(`UPDATE Bot SET prefix ="${prefix}" WHERE guildId = ${message.guild.id}`);
                message.channel.send(`Le préfix a été changé pour ${newprefix}. Pour reset le prefix veuillez mentionner le bot et mettre juste après "prefix".`);
                if (row.logsEnabled !== "true") return;
                let finder = message.guild.channels.find(c => c.name == row.logsChannel);
                if (!finder) return;
                let embed = new MessageEmbed()
                    .setTitle(`Prefix Changed.`)
                    .setTimestamp()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setThumbnail(bot.user.avatarURL)
                    .setColor(color)
                    .addField(`Prefix:`, prefix)
                    .addField(`Changed by:`, message.author.username)
                    .addField(`Changed at`, message.createdAt.toDateString())
                    .addField(`Case number:`, `#${row.caseNumber + 1}`)
                    .addField(`Message:`, `[JumpTo](${message.url})`);
                message.guild.channels.get(finder.id).send(embed);
            });
        });
      })
    } catch (e) {
        console.error;
        message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
};

module.exports.config = {
    name: "prefix",
    aliases: [],
    description: "Utilisez cette commande pour changer le préfixe du bot sur le serveur.",
    usage: "<prefix>",
    commandCategory: "Administration",
    cooldownTime: '5'
};