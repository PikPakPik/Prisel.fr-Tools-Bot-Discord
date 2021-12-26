const { MessageEmbed } = require("discord.js");
const addEntry = require('../../handlers/addDBserver.js');
const getNow = () => { return { time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = async (bot, message, args, con) => {
  con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
    color = row != null ? row[0].color : '#3A73A0';
    con.query(`SELECT guildMods FROM userown WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
      row = row[0];
let row1 = rows.map(r => r.guildMods);
if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
con.query(`SELECT gs.serverLogs, gs.serverlogsChannel, gs.vocalLogs, gs.vocallogsChannel, gs.roleLogs, gs.rolelogsChannel, gs.messageLogs, gs.messagelogsChannel FROM guildSettings as gs WHERE gs.guildId ="${message.guild.id}"`, async (e, row) => {
  serverLogs = row != null ? row[0].serverLogs : 'null';
  serverlogsChannel = row != null ? row[0].serverlogsChannel : 'null';
  vocalLogs = row != null ? row[0].vocalLogs : 'null';
  vocallogsChannel = row != null ? row[0].vocallogsChannel : 'null';
  roleLogs = row != null ? row[0].roleLogs : 'null';
  rolelogsChannel = row != null ? row[0].rolelogsChannel : 'null';
  messageLogs = row != null ? row[0].messageLogs : 'null';
  messagelogsChannel = row != null ? row[0].messagelogsChannel : 'null';

  let filter = (reaction, user) => ['✨', '📥','🔊','👥','💭'].includes(reaction.emoji.name) && user.id === message.author.id,
  dureefiltrer = response => { return response.author.id === message.author.id };
  const msgembed = new MessageEmbed()
          .setAuthor(`📚 Modification des paramètres à propos des logs de ${message.guild.name}`)
          .setColor(color)
          .setDescription("`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs des entrée du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages")
          .addField("`📥` Logs des entrée", "(" + serverLogs + ") " + serverlogsChannel, true)
          .addField("`🔊` Logs vocaux", "(" + vocalLogs + ") " + vocallogsChannel, true)
          .addField("`👥` Logs des rôles", "(" + roleLogs + ") " + rolelogsChannel, true)
          .addField("`💭` Logs messages", "(" + messageLogs + ") " + messagelogsChannel, true)
           message.channel.send(msgembed)
           .then(async m => { 
       const collector = m.createReactionCollector(filter, { time: 900000 });
       collector.on('collect', async (r, user) => { 
       if(r.emoji.name === "✨") { 
       message.channel.send(`\`${getNow().time}\` ✨ Création de la catégorie des logs en cours..`).then(msg => {
               m.guild.channels.create('Logs', {
                   type: 'category',
                   permissionsOverwrites: [{
                     id: message.guild.id,
                     deny: ['VIEW_CHANNEL']
                   }]
               }).then(c => {
                   c.guild.channels.create('join-leave', {
                       type: 'text',
                       parent: c.id,
                       permissionOverwrites: [
                          {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL']
                         },
                       ],
                     }).then(joinleave => {
                      con.query(`UPDATE guildSettings SET serverLogs ="true" WHERE guildId = ${message.guild.id}`);
                      con.query(`UPDATE guildSettings SET serverlogsChannel = ${joinleave.id} WHERE guildId = ${message.guild.id}`);
                   c.guild.channels.create('vocaux', {
                       type: 'text',
                       parent: c.id,
                       permissionOverwrites: [
                          {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL']
                         },
                       ],
                     }).then(vocaux => {
                      con.query(`UPDATE guildSettings SET vocalLogs ="true" WHERE guildId = ${message.guild.id}`);
                      con.query(`UPDATE guildSettings SET vocallogsChannel = ${vocaux.id} WHERE guildId = ${message.guild.id}`);
                   c.guild.channels.create('role', {
                       type: 'text',
                       parent: c.id,
                       permissionOverwrites: [
                          {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL']
                         },
                       ],
                     }).then(role => {
                      con.query(`UPDATE guildSettings SET roleLogs ="true" WHERE guildId = ${message.guild.id}`);
                      con.query(`UPDATE guildSettings SET rolelogsChannel = ${role.id} WHERE guildId = ${message.guild.id}`);
                      c.guild.channels.create('message', {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                           {
                             id: message.guild.id,
                             deny: ['VIEW_CHANNEL']
                          },
                        ],
                      }).then(message => {
                        con.query(`UPDATE guildSettings SET messageLogs ="true" WHERE guildId = ${message.guild.id}`);
                        con.query(`UPDATE guildSettings SET messagelogsChannel = ${message.id} WHERE guildId = ${message.guild.id}`);
                        m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages" , fields: [ {name: "`📥` Logs des entrée", value: "(" + serverLogs + ") " + serverlogsChannel, inline: true }, { name: "`🔊` Logs vocaux", value: "(" + vocalLogs + ") " + vocallogsChannel, inline: true},{ name: "`👥` Logs des rôles", value: "(" + roleLogs + ") " + rolelogsChannel, inline: true}, { name: "`💭` Logs messages", value: "(" + messageLogs + ") " + messagelogsChannel, inline: true}   ] } });         
                        msg.edit(`\`${getNow().time}\` ✨ Création de la catégorie des logs effectué avec succès.`)
                          });
                   });
                   });
               })
       
             })
               // --
               });
       } else if(r.emoji.name === "📥") {
           message.channel.send(`\`${getNow().time}\` 📥 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver les logs`).then(mp => {
               mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
               .then(cld => {
               var msg = cld.first();
               if(msg.content === "false") {
                con.query(`UPDATE guildSettings SET serverLogs ="false" WHERE guildId = ${message.guild.id}`);
                 message.channel.send(`\`${getNow().time}\` 📥 Vous avez désactivé les logs d'entrée`)
                 m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages" , fields: [ {name: "`📥` Logs des entrée", value: "(" + serverLogs + ") " + serverlogsChannel, inline: true }, { name: "`🔊` Logs vocaux", value: "(" + vocalLogs + ") " + vocallogsChannel, inline: true},{ name: "`👥` Logs des rôles", value: "(" + roleLogs + ") " + rolelogsChannel, inline: true}, { name: "`💭` Logs messages", value: "(" + messageLogs + ") " + messagelogsChannel, inline: true}   ] } });
               } else {  
               var channel = 
               message.guild.channels.cache.get(msg.content) ||
               message.mentions.channels.first() ||
               message.guild.channels.cache.fin(ch => ch.name === msg.content)
               if(!channel) return  message.channel.send(`\`${getNow().time}\` 📥 Salon incorrect`)
               con.query(`UPDATE guildSettings SET serverLogs ="true" WHERE guildId = ${message.guild.id}`);
               con.query(`UPDATE guildSettings SET serverlogsChannel = ${channel.id} WHERE guildId = ${message.guild.id}`);
               message.channel.send(`\`${getNow().time}\` 📥 Vous avez changé le salon des logs des entrée à \`${channel.name}\``)
               m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages" , fields: [ {name: "`📥` Logs des entrée", value: "(" + serverLogs + ") " + serverlogsChannel, inline: true }, { name: "`🔊` Logs vocaux", value: "(" + vocalLogs + ") " + vocallogsChannel, inline: true},{ name: "`👥` Logs des rôles", value: "(" + roleLogs + ") " + rolelogsChannel, inline: true}, { name: "`💭` Logs messages", value: "(" + messageLogs + ") " + messagelogsChannel, inline: true}   ] } });
               }
             });
               });
       } else if(r.emoji.name === "🔊") {
           message.channel.send(`\`${getNow().time}\` 🔊 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver les logs`).then(mp => {
               mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
               .then(cld => {
               var msg = cld.first();
       
               if(msg.content === "false") {
                con.query(`UPDATE guildSettings SET vocalLogs ="false" WHERE guildId = ${message.guild.id}`);
                 message.channel.send(`\`${getNow().time}\` 🔊 Vous avez désactivé les logs des entrée`)
                 m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages" , fields: [ {name: "`📥` Logs des entrée", value: "(" + serverLogs + ") " + serverlogsChannel, inline: true }, { name: "`🔊` Logs vocaux", value: "(" + vocalLogs + ") " + vocallogsChannel, inline: true},{ name: "`👥` Logs des rôles", value: "(" + roleLogs + ") " + rolelogsChannel, inline: true}, { name: "`💭` Logs messages", value: "(" + messageLogs + ") " + messagelogsChannel, inline: true}   ] } });       
               } else {  
               var channel = message.guild.channels.cache.get(msg.content)
               if(!channel) return  message.channel.send(`\`${getNow().time}\` 🔊 Salon incorrect.`)
               con.query(`UPDATE guildSettings SET vocalLogs ="true" WHERE guildId = ${message.guild.id}`);
               con.query(`UPDATE guildSettings SET vocallogsChannel = ${channel.id} WHERE guildId = ${message.guild.id}`);
               message.channel.send(`\`${getNow().time}\` 🔊 Vous avez changé le salon des logs vocaux à \`${channel.name}\``)
               m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages" , fields: [ {name: "`📥` Logs des entrée", value: "(" + serverLogs + ") " + serverlogsChannel, inline: true }, { name: "`🔊` Logs vocaux", value: "(" + vocalLogs + ") " + vocallogsChannel, inline: true},{ name: "`👥` Logs des rôles", value: "(" + roleLogs + ") " + rolelogsChannel, inline: true}, { name: "`💭` Logs messages", value: "(" + messageLogs + ") " + messagelogsChannel, inline: true}   ] } });     
               }
             });
               });
       } else if(r.emoji.name === "👥") {
           message.channel.send(`\`${getNow().time}\` 👥 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver les logs.`).then(mp => {
               mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
               .then(cld => {
               var msg = cld.first();
               
               if(msg.content === "false") {
                con.query(`UPDATE guildSettings SET roleLogs ="false" WHERE guildId = ${message.guild.id}`);
                 message.channel.send(`\`${getNow().time}\` 👥 Vous avez désactivé les logs des rôles`)
                 m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages" , fields: [ {name: "`📥` Logs des entrée", value: "(" + serverLogs + ") " + serverlogsChannel, inline: true }, { name: "`🔊` Logs vocaux", value: "(" + vocalLogs + ") " + vocallogsChannel, inline: true},{ name: "`👥` Logs des rôles", value: "(" + roleLogs + ") " + rolelogsChannel, inline: true}, { name: "`💭` Logs messages", value: "(" + messageLogs + ") " + messagelogsChannel, inline: true}   ] } });       
               } else { 
               var channel = message.guild.channels.cache.get(msg.content)
               if(!channel) return  message.channel.send(`\`${getNow().time}\` 👥 Salon incorrect.`)
               con.query(`UPDATE guildSettings SET roleLogs ="true" WHERE guildId = ${message.guild.id}`);
               con.query(`UPDATE guildSettings SET rolelogsChannel = ${channel.id} WHERE guildId = ${message.guild.id}`);
               message.channel.send(`\`${getNow().time}\` 👥 Vous avez changé le salon des logs des rôles à \`${channel.name}\``)
               m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages" , fields: [ {name: "`📥` Logs des entrée", value: "(" + serverLogs + ") " + serverlogsChannel, inline: true }, { name: "`🔊` Logs vocaux", value: "(" + vocalLogs + ") " + vocallogsChannel, inline: true},{ name: "`👥` Logs des rôles", value: "(" + roleLogs + ") " + rolelogsChannel, inline: true}, { name: "`💭` Logs messages", value: "(" + messageLogs + ") " + messagelogsChannel, inline: true}   ] } });     
               }
             });
               });
       } else if(r.emoji.name === "💭") {
           message.channel.send(`\`${getNow().time}\` 💭 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver les logs.`).then(mp => {
               mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
               .then(cld => {
               var msg = cld.first();
               if(msg.content === "false") {
                con.query(`UPDATE guildSettings SET messageLogs ="false" WHERE guildId = ${message.guild.id}`);
                 message.channel.send(`\`${getNow().time}\` 💭 Vous avez désactivé les logs des messages`)
                 m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages" , fields: [ {name: "`📥` Logs des entrée", value: "(" + serverLogs + ") " + serverlogsChannel, inline: true }, { name: "`🔊` Logs vocaux", value: "(" + vocalLogs + ") " + vocallogsChannel, inline: true},{ name: "`👥` Logs des rôles", value: "(" + roleLogs + ") " + rolelogsChannel, inline: true}, { name: "`💭` Logs messages", value: "(" + messageLogs + ") " + messagelogsChannel, inline: true}   ] } });          
               } else { 
               var channel = message.guild.channels.cache.get(msg.content)
               if(!channel) return  message.channel.send(`\`${getNow().time}\` 💭 Salon incorrect.`)
               con.query(`UPDATE guildSettings SET messageLogs ="true" WHERE guildId = ${message.guild.id}`);
               con.query(`UPDATE guildSettings SET messagelogsChannel = ${channel.id} WHERE guildId = ${message.guild.id}`);
               message.channel.send(`\`${getNow().time}\` 💭 Vous avez changé le salon des logs des messages à \`${channel.name}\``)
               m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👥`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages" , fields: [ {name: "`📥` Logs des entrée", value: "(" + serverLogs + ") " + serverlogsChannel, inline: true }, { name: "`🔊` Logs vocaux", value: "(" + vocalLogs + ") " + vocallogsChannel, inline: true},{ name: "`👥` Logs des rôles", value: "(" + roleLogs + ") " + rolelogsChannel, inline: true}, { name: "`💭` Logs messages", value: "(" + messageLogs + ") " + messagelogsChannel, inline: true}   ] } });         
               }
             });
           });
       }
       
       r.users.remove(user)
       });
       await m.react("✨")
       await m.react("📥")
       await m.react("🔊")
       await m.react("👥")
       await m.react("💭")
           });
          })})})
}
module.exports.config = {
    name: "logs",
    aliases: ["lpanel", "logspanel"],
    usage: "Use this command to manage chat logs.",
    commandCategory: "moderation",
    cooldownTime: '5'
};