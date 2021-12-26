const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, con) => {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT guildMods FROM usermod WHERE guildId ="${message.guild.id}"`, (e, rows) => {
          let row1 = rows.map(r => r.guildMods);
          if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
          
          if (!bot.lockit) bot.lockit = [];
        if (!message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) {
            return message.channel.send(`> ❌ **Ce channel est déjà fermé.**`);
        }
      
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        },`Channel Lock par ${message.author.username}`)

        message.channel.send(`AYAAAAA, ${message.author.username} vient de fermer ce channel !`);
    })
    })
};

module.exports.config = {
    name: "lock",
    aliases: [],
    description: "Fermer le channel à la discussion",
    usage: "",
    commandCategory: "moderation",
    cooldownTime: '5'
};