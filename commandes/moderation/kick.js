const { MessageEmbed } = require("discord.js");
const addEntry = require('../../handlers/addDBserver.js');

module.exports.run = async (bot, message, args, con) => {
  try {
    con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
      color = row != null ? row[0].color : '#3A73A0';
      con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings as gs WHERE gs.guildId ="${message.guild.id}"`, async (e, row) => {
  con.query(`SELECT guildMods FROM usermod WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
    row = row[0];
    let row1 = rows.map(r => r.guildMods);
    if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`Je n'ai pas la permission d'utiliser cette commande.`);

    if(!args[0]) return message.channel.send('Merci de spécifier un joueur.')
    let userToKick = message.guild.member(message.mentions.users.first())
    if(!userToKick) return message.channel.send('Veuillez mentionner un membre.')

    if (userToKick.roles.highest >= message.member.roles.highest) return message.channel.send(`Vous ne pouvez pas kick ce membre. Il a la même position que vous, ou une position supérieure.`);
    if (userToKick.roles.highest >= message.guild.me.roles.highest) return message.channel.send(`Je ne peux pas kick ce membre. Il a la même position que moi, ou une position supérieure.`);
    
    userToKick.kick()

    message.channel.send(`${userToKick} à bien été kick !`, false);
    con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
      row = row[0];
      const LogsEmbed = new MessageEmbed()
        .setTitle(`:hammer: Membre Kick :hammer:`)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField(`Membre kick:`, userToBan.user.username)
        .addField(`Kick par:`, message.author.username)
        .addField(`Kick le:`, new Date().toDateString())
        .setColor(color)
        .setFooter(bot.user.username);
      if (row.serverLogs !== "true") return;
      message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
    });
  })
})
    })
} catch (e) {
  console.error;
  funcs.send(`Oh no! An error occurred! \`${e.message}\`.`);
}
}

module.exports.config = {
  name: "kick",
  aliases: ["k"],
  description: "Kick un utilisateur du serveur.",
  usage: "<id / mention>",
  commandCategory: "moderation"
};