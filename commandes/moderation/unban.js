const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message, args, con) => {
  con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
    color = row != null ? row[0].color : '#3A73A0';
    prefix = row != null ? row[0].prefix : 'p!';
    con.query(`SELECT guildMods FROM usermod WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
      row = row[0];
let row1 = rows.map(r => r.guildMods);
if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);

if(!args[0]) return message.channel.send(`:x: ${message.author}, merci de fournir un ID`)
if(args[0]) {
  var user = await bot.users.fetch(args[0])
  console.log(user)
  if(!user) return message.channel.send(`:x: ${message.author}, utilisateur introuvable, essayez l'identifiant.`)
  ban = message.guild.fetchBan(user.id)
  if (ban) {
    message.channel.send(`L'Utilisateur à bien été unban.`);
      message.guild.members.unban(user.id)
      con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
        row = row[0];
        const LogsEmbed = new MessageEmbed()
            .setTitle(`:hammer: Membre Unban :hammer:`)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .addField(`Membre unban:`, user)
            .addField(`Unban par:`, message.author.username)
            .addField(`Unban à:`, new Date().toDateString())
            .addField(`Message:`, `[JumpTo](${message.url})`)
            .setColor(color)
            .setThumbnail(message.author.avatarURL)
            .setFooter(bot.user.username);
        if (row.serverLogs !== "true") return;
        message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
    });
  } else {
      message.channel.send(`:x: ${message.author}, l'utilisateur n'est pas bannis.`)
      }
  }
})})
};

module.exports.config = {
  name: "unban",
  aliases: [],
  description: "Débanne un utilisateur.",
  usage: "<id>",
  commandCategory: "moderation",
  cooldownTime: '0'
};