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
con.query(`SELECT c.status, c.total, c.totalformat, c.online, c.onlineformat, c.vocal, c.vocalformat, c.boost, c.boostformat FROM Counter as c WHERE c.guildId ="${message.guild.id}"`, async (e, row) => {
  total = row != null ? row[0].total : 'null';
  totalFormat = row != null ? row[0].totalformat : 'null';
  online = row != null ? row[0].online : 'null';
  onlineFormat = row != null ? row[0].onlineformat : 'null';
  vocal = row != null ? row[0].vocal : 'null';
  vocalFormat = row != null ? row[0].vocalformat : 'null';
  boost = row != null ? row[0].boost : 'null';
  boostFormat = row != null ? row[0].boostformat : 'null';
  status = row != null ? row[0].status : 'null';

  filter = (reaction, user) => ['✨','👤','👥', '⭐','🌟','🔉','🔊','💠','♦️'].includes(reaction.emoji.name) && user.id === message.author.id,
  dureefiltrer = response => { return response.author.id === message.author.id };
  const msgembed = new MessageEmbed()
  .setAuthor(`📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`)
  .setColor(color)
  .setDescription("`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal")
  .addField("`👤` Compteur total de membre:", total, true)
  .addField("`⭐` Compteur des membres en ligne:", online, true)
  .addField("`🔉` Compteur des membres en vocal:", vocal, true)
  .addField("`💠` Compteur de boost:", boost, true)
  .addField("`👥` Format du compteur total de membre:", totalFormat.replace(`<count>`, message.guild.memberCount), true)
  .addField("`🌟` Format du compteur des membres en ligne:", onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), true)
  .addField("`🔊` Format du compteur des membres en vocal:", vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), true)
  .addField("`♦️` Format du compteur de boost:", boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount || "0"), true) 
  if(status === 'false') {
    msgembed.addField("`📡` Status :", "🔴", true)
  } else {
    msgembed.addField("`📡` Status :", "🟢", true)
  }
  message.channel.send(msgembed)

.then(async m => { 
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async (r, user) => { 
if(r.emoji.name === "✨") { 
       message.channel.send(`\`${getNow().time}\` ✨ Création de la catégorie des logs en cours..`).then(msg => {
               m.guild.channels.create('📊 Compteur de membre', {
                   type: 'category',
                   permissionsOverwrites: [{
                     id: message.guild.id,
                     deny: ['CONNECT'],
                     allow: ['VIEW_CHANNEL']
                   }]
               }).then(c => {
                   c.setPosition(0)
                   c.guild.channels.create(`👥 Membres: ${message.guild.memberCount}`, {
                       type: 'voice',
                       parent: c.id,
                       permissionOverwrites: [
                          {
                            id: message.guild.id,
                            deny: ['CONNECT'],
                            allow: ['VIEW_CHANNEL']
                         },
                       ],
                     }).then(total => {
                   totalFormat = `👥 Membres: <count>`
                   total = total.id
                   con.query(`UPDATE Counter SET status ="true" WHERE guildId = ${message.guild.id}`);
                   con.query(`UPDATE Counter SET total = ${total} WHERE guildId = ${message.guild.id}`);
                   c.guild.channels.create(`✅ En ligne: ${message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size}`, {
                       type: 'voice',
                       parent: c.id,
                       permissionOverwrites: [
                          {
                            id: message.guild.id,
                            deny: ['CONNECT'],
                            allow: ['VIEW_CHANNEL']
                         },
                       ],
                     }).then(online => {
                   onlineFormat = `✅ En ligne: <count>`
                   online = online.id
                   con.query(`UPDATE Counter SET online = ${online} WHERE guildId = ${message.guild.id}`);
                   c.guild.channels.create(`🎧 En vocal: ${message.guild.members.cache.filter(m => m.voice.channel).size}`, {
                       type: 'voice',
                       parent: c.id,
                       permissionOverwrites: [
                          {
                            id: message.guild.id,
                            deny: ['CONNECT'],
                            allow: ['VIEW_CHANNEL']
                         },
                       ],
                     }).then(vocal => {
                       vocalFormat =  `🎧 En vocal: <count>`
                       vocal = vocal.id
                       con.query(`UPDATE Counter SET vocal = ${vocal} WHERE guildId = ${message.guild.id}`);
                       c.guild.channels.create(`💠 Boost: ${message.guild.premiumSubscriptionCount}`, {
                        type: 'voice',
                        parent: c.id,
                        permissionOverwrites: [
                           {
                             id: message.guild.id,
                             deny: ['CONNECT'],
                             allow: ['VIEW_CHANNEL']
                          },
                        ],
                      }).then(boost => {
                        bosstFormat =  `💠 Boost: <count>`
                        boost = boost.id
                        con.query(`UPDATE Counter SET boost = ${boost} WHERE guildId = ${message.guild.id}`);
                       m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });                         
                       msg.edit(`\`${getNow().time}\` ✨ Création de la catégorie du compteur de membre effectué avec succès.`)
                      })
                         });
                       });
                   });
                   });
               })
} else if(r.emoji.name === "👤") {
   message.channel.send(`\`${getNow().time}\` 👤 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver le compteur.`).then(mp => {
       mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
       .then(cld => {
       var msg = cld.first();
       if(msg.content === "false") {
         con.query(`UPDATE Counter SET total ="none" WHERE guildId = ${message.guild.id}`);
         message.channel.send(`\`${getNow().time}\` 👤 Vous avez désactivé le compteur.`)
m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });          } else { 
       var channel = message.guild.channels.cache.get(msg.content)
       if(!channel) return message.channel.send(`\`${getNow().time}\` 👤 Salon incorrect.`)
       totali = channel.id
       console.log(total)
       con.query(`UPDATE Counter SET status = "true" WHERE guildId = ${message.guild.id}`);
       con.query(`UPDATE Counter SET total = ${totali} WHERE guildId = ${message.guild.id}`);
       message.channel.send(`\`${getNow().time}\` 👤 Vous avez changé le salon des compteurs de membre à \`${channel.name}\``)
       channel.setName(totalFormat.replace(`<count>`, message.guild.memberCount)).catch(console.error)
m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });         }
     });
       });
} else if(r.emoji.name === "👥") {
   message.channel.send(`\`${getNow().time}\` 👥 Veuillez écrire le format que vous souhaitez, ajoutez \`<count>\` pour ajouter le nombre de membre`).then(mp => {
       mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
       .then(cld => {
       var msg = cld.first();
       if(msg.content.includes('<count>')) {
           totalFormati = msg.content
           message.channel.send(`\`${getNow().time}\` 👥 Vous avez changé le format du compteur de membres en \`${msg.content.replace(`<count>`, message.guild.memberCount)}\``)
           con.query(`UPDATE Counter SET totalformat = "${totalFormati}" WHERE guildId = ${message.guild.id}`);
           var channel = bot.channels.cache.get(total)
           if(!channel) return;
           channel.setName(totalFormati.replace(`<count>`, message.guild.memberCount)).catch(console.error).then(console.log)
m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormati.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });         } else {
       message.channel.send(`\`${getNow().time}\` 👥 Format incorrect, ajoutez \`<count>\` dans le format.`)
       }
       });
   });
} else if(r.emoji.name === "⭐") {
   message.channel.send(`\`${getNow().time}\` ⭐ Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver le compteur.`).then(mp => {
       mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
       .then(cld => {
       var msg = cld.first();
       if(msg.content === "false") {
         con.query(`UPDATE Counter SET online = "none" WHERE guildId = ${message.guild.id}`);
         message.channel.send(`\`${getNow().time}\` ⭐ Vous avez désactivé le compteur`)
m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });          } else { 
       var channel = message.guild.channels.cache.get(msg.content)
       if(!channel) return message.channel.send(`\`${getNow().time}\` ⭐ Salon incorrect.`)
       onlinei = channel.id
       con.query(`UPDATE Counter SET status = "true" WHERE guildId = ${message.guild.id}`);
       con.query(`UPDATE Counter SET online = ${onlinei} WHERE guildId = ${message.guild.id}`);
       message.channel.send(`\`${getNow().time}\` ⭐ Vous avez changé le salon du compteur de membres en ligne à \`${channel.name}\``)
       channel.setName(onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size)).catch(console.error)
m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });         }
     });
       });
} else if(r.emoji.name === "🌟") {
   message.channel.send(`\`${getNow().time}\` 🌟 Veuillez écrire le format que vous souhaitez, ajoutez \`<count>\` pour ajouter le nombre de membre`).then(mp => {
       mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
       .then(cld => {
       var msg = cld.first();
       if(msg.content.includes('<count>')) {
           onlineFormati = msg.content
            con.query(`UPDATE Counter SET onlineformat = "${onlineFormati}" WHERE guildId = ${message.guild.id}`);
           message.channel.send(`\`${getNow().time}\` 🌟 Vous avez changé le format du compteur de membres en \`${msg.content.replace(`<count>`, message.guild.memberCount)}\``)
           var channel = bot.channels.cache.get(online)
           if(!channel)
           channel.setName(onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size)).catch(console.error)
m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormati.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });         } else {
       message.channel.send(`\`${getNow().time}\` 🌟 Format incorrect, ajoutez \`<count>\` dans le format.`)
       }
       });
   });
} else if(r.emoji.name === "🔉") {
   message.channel.send(`\`${getNow().time}\` 🔉 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver le compteur.`).then(mp => {
       mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
       .then(cld => {
       var msg = cld.first();
       if(msg.content === "false") {
        con.query(`UPDATE Counter SET vocal = "none" WHERE guildId = ${message.guild.id}`);
         message.channel.send(`\`${getNow().time}\` 🔉 Vous avez désactivé le compteur`)
m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });          } else { 
       var channel = message.guild.channels.cache.get(msg.content)
       if(!channel) return message.channel.send(`\`${getNow().time}\` 🔉 Salon incorrect.`)
       vocali = channel.id
       con.query(`UPDATE Counter SET status = "true" WHERE guildId = ${message.guild.id}`);
       con.query(`UPDATE Counter SET vocal = ${vocali} WHERE guildId = ${message.guild.id}`);
       message.channel.send(`\`${getNow().time}\` 🔉 Vous avez changé le salon du compteur de membres en vocal à \`${channel.name}\``)
       channel.setName(vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size)).catch(console.error)

m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });         }
     });
       });
} else if(r.emoji.name === "🔊") {
   message.channel.send(`\`${getNow().time}\` 🔊 Veuillez écrire le format que vous souhaitez, ajoutez \`<count>\` pour ajouter le nombre de membre`).then(mp => {
       mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
       .then(cld => {
       var msg = cld.first();
       if(msg.content.includes('<count>')) {
           vocalFormati = msg.content
          con.query(`UPDATE Counter SET vocalformat = "${vocalFormati}" WHERE guildId = ${message.guild.id}`);
           message.channel.send(`\`${getNow().time}\` 🔊 Vous avez changé le format du compteur de membres en \`${msg.content.replace(`<count>`, message.guild.memberCount)}\``)
           var channel = bot.channels.cache.get(vocal)
           if(!channel)
           channel.setName(vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size)).catch(console.error)
m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormati.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });         } else {
       message.channel.send(`\`${getNow().time}\` 🔊 Format incorrect, ajoutez \`<count>\` dans le format.`)
       }
       });
   });
} else if(r.emoji.name === "💠") {
message.channel.send(`\`${getNow().time}\` 💠 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver le compteur.`).then(mp => {
  mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
     .then(cld => {
     var msg = cld.first();
     if(msg.content === "false") {
      con.query(`UPDATE Counter SET boost ="none" WHERE guildId = ${message.guild.id}`);
       message.channel.send(`\`${getNow().time}\` 💠 Vous avez désactivé le compteur`)
       m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });              
      } else { 
     var channel = message.guild.channels.cache.get(msg.content)
     if(!channel) return message.channel.send(`\`${getNow().time}\` 💠 Salon incorrect.`)
     boosti = channel.id
     con.query(`UPDATE Counter SET status = "true" WHERE guildId = ${message.guild.id}`);
          con.query(`UPDATE Counter SET boost = ${boosti} WHERE guildId = ${message.guild.id}`);
    message.channel.send(`\`${getNow().time}\` 💠 Vous avez changé le salon du compteur de membres en vocal à \`${channel.name}\``)
     channel.setName(boostFormat.replace(`<count>`, message.guild.premiumSubscriptionCount)).catch(console.error)

     m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true }, { name: "`📡` Status:", value: status, inline: true} ]} });               
     }
   });
     });
} else if(r.emoji.name === "♦️") {
 message.channel.send(`\`${getNow().time}\` ♦️ Veuillez écrire le format que vous souhaitez, ajoutez \`<count>\` pour ajouter le nombre de boost`).then(mp => {
     mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
     .then(cld => {
     var msg = cld.first();
     if(msg.content.includes('<count>')) {
      boostFormati = msg.content
          con.query(`UPDATE Counter SET boostformat = "{boostFormati}" WHERE guildId = ${message.guild.id}`);
         message.channel.send(`\`${getNow().time}\` ♦️ Vous avez changé le format du compteur de membres en \`${msg.content.replace(`<count>`, message.guild.premiumSubscriptionCount)}\``)
         var channel = bot.channels.cache.get(boost)
         if(!channel)
         channel.setName(boostformat.replace(`<count>`, message.guild.premiumSubscriptionCount)).catch(console.error)
 m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n`💠`  Configurer le salon du compteur de boosts\n`♦️` Changer le format du compteur de boost", fields: [ {name: "`👤` Compteur total de membre:", value: total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: online, inline: true},{ name: "`🔉` Compteur des membres en vocal:", value: vocal, inline: true}, { name: "`💠` Compteur de boost:", value: boost, inline: true}, { name: "`👥` Format du compteur total de membre:", value: totalFormat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: onlineFormat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: vocalFormat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true}, { name: "`♦️` Format du compteur de boost:", value: boostFormati.replace(`<count>`, message.guild.premiumSubscriptionCount), inline: true}, { name: "`📡` Status:", value: status, inline: true} ]} });       } else {
     message.channel.send(`\`${getNow().time}\` ♦️ Format incorrect, ajoutez \`<count>\` dans le format.`)
     }
     });
 });
}
r.users.remove(user)
});
await m.react("✨")
await m.react("👤")
await m.react("👥")
await m.react("⭐")
await m.react("🌟")
await m.react("🔉")
await m.react("🔊")
await m.react("💠")
await m.react("♦️")
   });

  })})})
}
module.exports.config = {
    name: "counter",
    aliases: ["cpanel", "counterpanel"],
    usage: "Use this command to manage chat logs.",
    commandCategory: "administration",
    cooldownTime: '5'
};