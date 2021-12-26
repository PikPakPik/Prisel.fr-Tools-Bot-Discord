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
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`Je n'ai pas la permission d'utiliser cette command.`);
    
    if(!args[0]) return message.channel.send('Merci de spécifier un joueur.')
    const   getMention = (message, excludeAuthor = false) =>
    message.mentions.members.first() ||
    message.mentions.users.first() ||
    message.guild.member(args[0])

    const member = getMention(message, true)
    if(!member) {
        var memberr = args[0]
    }
    const id = parseInt(args[0]);
    let userToBan = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0])
    if(!userToBan) {
      if(isNaN(id)) return message.channel.send("Ceci n'est pas un id valide !")
      let filter = (reaction, user) => ['✅','❌'].includes(reaction.emoji.name) && user.id === message.author.id;

      message.channel.send(`Voulez vous que l'ID **${id}** soit banni à son arrivé ?`).then(async m => { 
        const collector = m.createReactionCollector(filter, { time: 900000 });
        collector.on('collect', async (r, user) => { 
          if(r.emoji.name === '✅') {
                addEntry.addafterbanUserId(message.guild.id, id)
                m.edit(`L'ID **${id}** serra bien banni à son arrivé !`)
                return;
            } else if(r.emoji.name === '❌') {
              r.users.remove(user)
              m.edit("Bannissement refusé...")
              m.delete()
              return;
            }
            r.users.remove(user)
        });
        await m.react("✅")
        await m.react("❌")
            });
            return
    }

    if (userToBan.roles.highest >= message.member.roles.highest) return message.channel.send(`Vous ne pouvez pas bannir ce membre. Il a la même position que vous, ou une position supérieure.`);
    if (userToBan.roles.highest >= message.guild.me.roles.highest) return message.channel.send(`Je ne peux pas ban ce membre. Il a la même position que moi, ou une position supérieure.`);

    userToBan.ban()

    con.query(`SELECT * FROM userPunishments WHERE guildId ="${message.guild.id}" AND userId ="${userToBan.id}"`, async (e, row) => {
      if (!row) {
        addEntry.addDbEntryUserId(message.guild.id, userToBan.id, 'ban');
      }
      row = row[0];
      con.query(`UPDATE userPunishments SET bans = ${row.bans + 1} WHERE guildId = ${message.guild.id} AND userId = ${userToBan.id}`);
    });
    message.channel.send(`${userToBan} à bien été banni !`, false);
    con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
      row = row[0];
      const LogsEmbed = new MessageEmbed()
        .setTitle(`:hammer: Membre Banni :hammer:`)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField(`Membre banni:`, userToBan.user.username)
        .addField(`Banni par:`, message.author.username)
        .addField(`Banni le:`, new Date().toDateString())
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
  name: "ban",
  aliases: [""],
  usage: "<id / mention>",
  description: "Banni un utilisateur du serveur.",
  commandCategory: "moderation"
};