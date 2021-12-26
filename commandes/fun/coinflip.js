const { MessageEmbed } = require('discord.js');
var things = [
    "Pile",
    'Face'
];
module.exports.run = (bot, message, args, con) => {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
    try {
        const embed = new MessageEmbed()
            .setTitle("Pile ou Face")
            .setTimestamp()
            .setThumbnail(bot.user.avatarURL)
            .setAuthor(message.author.username)
            .setColor(color)
            .addField(`Pile ou face:`, things[Math.floor(Math.random() * things.length)]);
        message.channel.send(embed);
    } catch (e) {
        console.error;
        funcs.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
})
};

module.exports.config = {
    name: "coinflip",
    aliases: ["cf"],
    description: "Utilisez cette commande pour lancer une pièce.",
    usage: "",
    commandCategory: "fun",
    cooldownTime: '5'
};