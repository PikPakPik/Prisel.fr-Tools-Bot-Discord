const { MessageEmbed } = require('discord.js');
module.exports.run = (bot, message, args, con) => {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
    const person = message.mentions.members.first() || message.member;
    const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(color)
        .setFooter(bot.user.username)
        .setImage(person.user.displayAvatarURL({ dynamic: true }))
        .setURL(person.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Télécharger`);
    message.channel.send(embed);
    })
};

module.exports.config = {
    name: "avatar",
    aliases: ["a"],
    description: "Utilisez cette commande pour accéder à l'avatar de quelqu'un.",
    usage: "<@membre>",
    commandCategory: "fun",
    cooldownTime: '5'
};