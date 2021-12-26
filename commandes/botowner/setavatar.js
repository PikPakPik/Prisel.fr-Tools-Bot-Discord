var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = async (client, message, args, con) => {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT guildMods FROM userown WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
          row = row[0];
          let row1 = rows.map(r => r.guildMods);
          if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
            if(!message.guild) return;
        
            if(message.attachments.size > 0) { 
            message.attachments.forEach(attachment => {
                client.user.setAvatar(attachment.url)
                .then(u => message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, Vous avez changé la photo de profil de votre bot.`))
                .catch(e => { return message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Une erreur a été rencontré. \n **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });
            });
            } else if (args.length) {
                let str_content = args.join(" ")
                client.user.setAvatar(str_content)
                .then(u => message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, Vous avez changé la photo de profil de votre bot.`))
                .catch(e => { return message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Une erreur a été rencontré. \n **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });
            } else {
                message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Vous avez fournie aucune valeur, veuillez mettre sois une image sois un lien`);
            }
        
        }
        )
})
};


module.exports.config = {
    name: "setavatar",
    aliases: ['botavatar', 'avatarset'],
    commandCategory: 'Administration',
    usage: "<lien image / image>",
    description: "Permet de changer la photo de profil du bot"
  };