const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
const addEntry = require('../../handlers/addDBserver.js');


module.exports.run = async (bot, message, args, con) => {
    con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT guildMods FROM userown WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
          row = row[0];
    let row1 = rows.map(r => r.guildMods);
    if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
    if(!message.guild) return;
    con.query(`SELECT s.status, s.role, s.statut FROM statut as s WHERE s.guildId ="${message.guild.id}"`, async (e, row) => {
        status = row != null ? row[0].status : 'null';
        rolea = row != null ? row[0].role : 'null';
        statutcolo = row != null ? row[0].statut : 'null';
      
   filter = (reaction, user) => ['👥', '🏷️','✅','❌'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setAuthor(`😄 Modification des paramètres à propos du Custom Status de ${message.guild.name}`)
   .setColor(color)
   .setDescription("`👥`  Définir le rôle à donner\n`🏷️` Définir le statut a mettre \n`✅` Activer le module\n`❌` Désactiver le module\n\n>  [Configuration actuelle](http://Prada.bot)")
   .addField("`👥` Rôle", rolea, true)
   .addField("`🏷️` Statut", statutcolo, true)
   .addField("`🛠️` Module", status, true)
    message.channel.send(msgembed)
    .then(async m => { 
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async (r, user) => { 
    if(r.emoji.name === '👥') {
		message.channel.send(`\`${getNow().time}\` 👥 Veuillez entrée l'ID du rôle.`).then(mp => {
			mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
			.then(cld => {
			var msg = cld.first();
			var role = message.guild.roles.cache.get(msg.content)
			if(!role) return  message.channel.send(`\`${getNow().time}\` 👥 Rôle incorrect.`)
            rolea = role.id
            m.edit({ embed: { author: { name: `😄 Modification des paramètres à propos du Custom Status de ${message.guild.name}`}, color: color, description: "`👥`  Définir le rôle à donner\n`🏷️` Définir le statut a mettre \n`✅` Activer le module\n`❌` Désactiver le module\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👥` Rôle", value: rolea, inline: true }, { name: "`🏷️` Statut", value: statutcolo, inline: true}, { name: "`🛠️` Module", value: status, inline: true}  ] } });         
            con.query(`UPDATE statut SET role = ${rolea} WHERE guildId = ${message.guild.id}`);
			message.channel.send(`\`${getNow().time}\` 👥 Vous avez changé le rôle a donner en \`${role.name}\``)
			});
			});
	} else if(r.emoji.name === '🏷️') {
		message.channel.send(`\`${getNow().time}\` 🏷️ Veuillez entrée le statut que les utilisateurs doivent avoir.`).then(mp => {
			mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
			.then(cld => {
			var msg = cld.first();
            var statutad = msg.content
            m.edit({ embed: { author: { name: `😄 Modification des paramètres à propos du Custom Status de ${message.guild.name}`}, color: color, description: "`👥`  Définir le rôle à donner\n`🏷️` Définir le statut a mettre \n`✅` Activer le module\n`❌` Désactiver le module\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👥` Rôle", value: rolea, inline: true }, { name: "`🏷️` Statut", value: statutcolo, inline: true}, { name: "`🛠️` Module", value: status, inline: true}  ] } });         
            con.query(`UPDATE statut SET statut = "${statutad}" WHERE guildId = ${message.guild.id}`);
			message.channel.send(`\`${getNow().time}\` 🏷️ Vous avez changé le statut que les utilisateurs doivent avoir en \`${msg}\``)
			});
			});
	} else if(r.emoji.name === '✅') {
        if(status === "true") { return message.channel.send(`\`${getNow().time}\` ✅ Le module est déjà activé.`); }
        const statute = "true"
        m.edit({ embed: { author: { name: `😄 Modification des paramètres à propos du Custom Status de ${message.guild.name}`}, color: color, description: "`👥`  Définir le rôle à donner\n`🏷️` Définir le statut a mettre \n`✅` Activer le module\n`❌` Désactiver le module\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👥` Rôle", value: rolea, inline: true }, { name: "`🏷️` Statut", value: statutcolo, inline: true}, { name: "`🛠️` Module", value: statute, inline: true}  ] } });         
        con.query(`UPDATE statut SET status = "true" WHERE guildId = ${message.guild.id}`);
        message.channel.send(`\`${getNow().time}\` ✅ Vous avez activé le module d'autorole via **Custom Statut**`)
    } else if(r.emoji.name === '❌') {
            if(status === "false") return message.channel.send(`\`${getNow().time}\` ❌ Le module est déjà désactivé.`);
            const statute = "false"
            m.edit({ embed: { author: { name: `😄 Modification des paramètres à propos du Custom Status de ${message.guild.name}`}, color: color, description: "`👥`  Définir le rôle à donner\n`🏷️` Définir le statut a mettre \n`✅` Activer le module\n`❌` Désactiver le module\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👥` Rôle", value: rolea, inline: true }, { name: "`🏷️` Statut", value: statut, inline: true}, { name: "`🛠️` Module", value: statute, inline: true}  ] } });         
            con.query(`UPDATE statut SET status = "false" WHERE guildId = ${message.guild.id}`);
            message.channel.send(`\`${getNow().time}\` ❌ Vous avez désactivé le module d'autorole via **Custom Statut**`)
    }
    r.users.remove(user)
});
await m.react("👥")
await m.react("🏷️")
await m.react("✅")
await m.react("❌")
    });
        })
    })
      })

};


module.exports.config = {
    name: "statut",
    aliases: ['spanel','statutpanel'],
    commandCategory: 'administration',
    description: "Permet d'afficher le panel de configuration des Custom Status.",
    usage: ""
  };