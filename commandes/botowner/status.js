var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
const { MessageEmbed } = require('discord.js')
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports.run = async (client, message, args, con) => {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT guildMods FROM userown WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
          row = row[0];
          let row1 = rows.map(r => r.guildMods);
          if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
    if(!message.guild) return;

    var statusembed = new MessageEmbed()
    .setTitle('<:option:869325418304516177> | Statut du bot')
    .setDescription(`Veuillez sélectionner l'action voulu grâce aux boutons ci dessous`)
    .setColor(color)
    let change = new MessageButton()
    .setStyle('gray')
    .setEmoji('869324717952217129')
    .setID('changestat');
    let disable = new MessageButton()
    .setStyle('red')
    .setEmoji('869324285553045514')
    .setID('disablestat');
    let banyesno = new MessageActionRow()
    .addComponents(change, disable)
  
    message.channel.send(statusembed, banyesno);

      })
    })
};


module.exports.config = {
    name: "setstatut",
    aliases: ['st'],
    commandCategory: 'Administration',
    usage: "",
    description: "Permet de modifier le status du Bot"
  };