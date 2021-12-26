const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, con) => {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
    try {
        let what = args.join(` `);
        if (!what) return funcs.send(`Vous devez entrez du texte.`);
        let e = new MessageEmbed()
            .setColor(color)
            .addField(`Texte:`, what)
            .addField(`Nombre:`, `${what.length} caractère(s).`)
            .setTimestamp()
            .setThumbnail(bot.user.avatarURL);
        message.channel.send(e);
    } catch (err) {
        console.log(err) 
        return funcs.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
      }
    })
};

module.exports.config = {
    name: "caractere",
    aliases: ["caraccount", "ccount"],
    description: "Utilisez cette commande pour obtenir le nombre de caractères de quelque chose.",
    usage: "<texte>",
    commandCategory: "Utilitaire",
    cooldownTime: '5'
};