const {  MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, con) => {
    try {
        con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
            color = row != null ? row[0].color : '#3A73A0';
            con.query(`SELECT guildMods FROM usermod WHERE guildId ="${message.guild.id}"`, (e, rows) => {
                let row1 = rows.map(r => r.guildMods);
                if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
                let pollText = args.join(` `);
                if (!pollText) return message.channel.send(`Vous devez spécifier un sondage !`);
                pollText = pollText.substr(0, 1000);
                const embed = new  MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setColor(color)
                    .setFooter(bot.user.username)
                    .setTitle(`Sondage Lancé`)
                    .setDescription(pollText)
                    .addField(`Lancé par:`, message.author.tag)
                    .setThumbnail(message.author.avatarURL);
                message.channel.send(embed).then(m => {
                    m.react("✅");
                    m.react("🤷");
                    m.react("❌");
                }).catch(() => { });
                message.delete().catch(() => { });
            })
    })
    } catch (e) {
        console.error;
        message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
};

module.exports.config = {
    name: "sondage",
    aliases: ["pool"],
    description: "Utilisez cette commande pour créer un sondage.",
    usage: "<question / sondage>",
    commandCategory: "moderation",
    cooldownTime: '5'
};