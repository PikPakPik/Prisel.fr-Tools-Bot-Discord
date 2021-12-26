var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = async (client, message, args, con) => {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT guildMods FROM userown WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
          row = row[0];
          let row1 = rows.map(r => r.guildMods);
          if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
    if(!message.guild) return;

       if (args.length) {
        if(message.content.includes('#')) {
        let str_content = args.join(" ")
        message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, Vous avez définis la couleur des embeds de cette guilde en \`${str_content}\`.`);
        con.query(`UPDATE Bot SET color = "${str_content}" WHERE guildId = ${message.guild.id}`)
        } else {
            message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Vous n'avez pas fournie un code HEX, veuillez refaire la commande en incluant un code HEX (#3A73A0, ceci est un code HEX).`);
        }
    } else {
        message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Vous n'avez fournie aucune valeur, veuillez refaire la commande en incluant un prefixe.`);
    }

      })
    })
};


module.exports.config = {
    name: "color",
    aliases: ['colorembed','theme'],
    commandCategory: 'Administration',
    usage: "<HEX CODE>",
    description: "Permet de changer la couleur des embeds du serveur"
  };