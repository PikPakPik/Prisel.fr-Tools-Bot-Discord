const {  MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, con) => {
  try {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
      color = row != null ? row[0].color : '#3A73A0';
      con.query(`SELECT guildMods FROM userown WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
        row = row[0];
        let row1 = rows.map(r => r.guildMods);
        if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
        const embed = new MessageEmbed()
                          .setTitle("🎫 PROMOTION BOUTIQUE 🎫")
                          .setURL("https://prisel.fr/boutique")
                          .setAuthor("Prisel.fr | Boutique", "https://i.imgur.com/DvYUdFB.png","https://prisel.fr/boutique")
                          .setColor("#FFFF00")
                          .setDescription(args.slice(0).join(` `))
                          .setThumbnail("https://i.pinimg.com/originals/a4/b1/cc/a4b1ccc515ff9547ae0260167c7f0797.gif")
                          message.channel.send({embed})
    })
  })
  } catch (e) {
    console.error;
    message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
  }
};

module.exports.config = {
  name: "promo",
  aliases: [],
  usage: "Random.",
  commandCategory: "Administration",
  cooldownTime: '5'
};