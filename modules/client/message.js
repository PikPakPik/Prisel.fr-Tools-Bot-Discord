const { dbConnect } = require('./../../handlers/MYSQL.js');
const { MessageEmbed } = require('discord.js')
let con;
con = dbConnect();

let prefix;

module.exports = async (bot, message) => {
  if (message.author.bot || message.channel.type === "dm") return;
  con.query(`SELECT gp.prefix, gp.color FROM Bot AS gp WHERE gp.guildId ="${message.guild.id}"`, async (e, row) => {
      con.query(`SELECT * FROM usermod WHERE guildId = '${message.guild.id}'`, async (e, mods) => {
        con.query(`SELECT * FROM userown WHERE guildId = '${message.guild.id}'`, async (e, modss) => {
          con.query(`SELECT * FROM userbl WHERE guildId ="${message.guild.id}" AND user ="${message.author.id}"`, async (e, user) => {
            prefix = row != null ? row[0].prefix : 'p!';

            if (!message.content.startsWith(prefix) || message.author.bot) return;


            var args = message.content.slice(prefix.length).split(/ +/),
            commandName = args.shift().toLowerCase(),
            command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(commandName));
              // -- Si il ne s'agit pas d'une commande, ne rien faire
              if (!command) return;
          
              // -- Lancer la commande
              command.run(bot, message, args, con);

              
          });
      });
  });
  const args = message.content
              .slice()
              .trim()
              .split(/ +/g);
  if(message.channel.id === "838851135506219059") {
    const embed = new MessageEmbed()
                          .setTitle("🎫 PROMOTION BOUTIQUE 🎫")
                          .setURL("https://prisel.fr/boutique")
                          .setAuthor("Prisel.fr | Boutique", "https://i.imgur.com/DvYUdFB.png","https://prisel.fr/boutique")
                          .setColor("#FFFF00")
                          .setDescription(args.slice(0).join(` `))
                          .setThumbnail("https://i.pinimg.com/originals/a4/b1/cc/a4b1ccc515ff9547ae0260167c7f0797.gif")
                          message.channel.send({embed})
  }
})
}