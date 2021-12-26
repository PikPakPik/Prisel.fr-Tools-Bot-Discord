const { MessageEmbed } = require('discord.js');
const authorizedId = ['710438426788233256', '706548592818782290','801153328016130069'];
module.exports.run = async (bot, message, args, con) => {
    try {
      con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
    if (!authorizedId.some(id => message.author.id === id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
        con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings as gs WHERE gs.guildId ="${message.guild.id}"`, async (e, row) => {
          row = row[0];

          const   getMention = (message, excludeAuthor = false) =>
          message.mentions.members.first() ||
          message.mentions.users.first() ||
          message.guild.member(args[1])
      
          const member = getMention(message, true)
          if(!member) {
              var memberr = args[1]
          }
            if(args[0].toLowerCase() === 'add') {
              if(!args[1]) return message.reply("Merci de mentionnez ou de mettre l'id")
              if(member) {
                  con.query(`SELECT u.guildMods FROM userown AS u WHERE u.guildId="${message.guild.id}"`, (err, rows) => { 
                      if(err) throw err;
                      if(!rows.length) {  
                        con.query(`INSERT INTO userown (guildId, guildMods) VALUES (?, ?)`, [message.guild.id, member.id]);
                          message.channel.send(`**${member.user.username}** est désormai owner.`)
                          con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                            row = row[0];
                            const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Owner Add :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Owner:`, member.user.username)
                              .addField(`Add par:`, message.author.username)
                              .addField(`Add le:`, new Date().toDateString())
                              .setColor(color)
                              .setFooter(bot.user.username);
                            if (row.logsEnabled !== "true") return;
                            message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                          });
                          
                      } else {  
                          return message.channel.send(`**${member.user.username}** est déjà owner.`);
  
                      }
                  });
              } else {
                con.query(`SELECT u.guildMods FROM userown AS u WHERE (u.guildId="${message.guild.id}" AND u.guildMods="${memberr}")`, (err, rows) => { 
                      if(err) throw err;
                      if(!rows.length) {  
                        con.query(`INSERT INTO userown (guildId, guildMods) VALUES (?, ?)`, [message.guild.id, memberr]);
                          message.channel.send(`**${memberr}** est désormai owner`)
                          con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                            row = row[0];
                            const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Owner Add :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Owner:`, memberr)
                              .addField(`Add par:`, message.author.username)
                              .addField(`Add le:`, new Date().toDateString())
                              .setColor(color)
                              .setFooter(bot.user.username);
                            if (row.serverLogs !== "true") return;
                            message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                          });
                      } else {  
                          return message.channel.send(`**${memberr}** est déjà blacklist`);
  
                      }
                  });
              }
          } else if(args[0].toLowerCase() === 'remove') {
              if(!args[1]) return message.reply("Merci de mentionnez ou de mettre l'id")
              if(member) {
                con.query(`SELECT u.guildMods FROM userown AS u WHERE (u.guildId="${message.guild.id}" AND u.guildMods="${member.id}")`, (err, rows) => { 
                  if(err) throw err;
                  if(rows.length) {  
                      con.query(`DELETE FROM userown WHERE (guildId="${message.guild.id}" AND guildMods="${member.id}")`);
                      con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                        row = row[0];
                        const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Owner Remove :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Owner:`, member.user.username)
                              .addField(`Remove par:`, message.author.username)
                              .addField(`Remove le:`, new Date().toDateString())
                              .setColor(color)
                              .setFooter(bot.user.username);
                        if (row.serverLogs !== "true") return;
                        message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                      });
                      return message.channel.send(`**${member}** n'est désormai plus owner`);
                  } else {  
                      return message.channel.send(`**${member}** n'est pas owner`);
                  }
              });
              } else {
                con.query(`SELECT u.guildMods FROM userown AS u WHERE (u.guildId="${message.guild.id}" AND u.guildMods="${args[1]}")`, (err, rows) => { 
                  if(err) throw err;
                  if(rows.length) {  
                      con.query(`DELETE FROM userown WHERE (guildId="${message.guild.id}" AND guildMods="${args[1]}")`);
                      con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                        row = row[0];
                        const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Owner Remove :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Owner:`, memberr)
                              .addField(`Remove par:`, message.author.username)
                              .addField(`Remove le:`, new Date().toDateString())
                              .setColor(color)
                              .setFooter(bot.user.username);
                        if (row.serverLogs !== "true") return;
                        message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                      });
                      return message.channel.send(`**${args[1]}** n'est désormai plus owner`);
                  } else {  
                      return message.channel.send(`**${args[1]}** n'est pas modérateur`);
                  }
              });
              }
          } else if(args[0].toLowerCase() === 'list') {
              const blacklist = `SELECT guildMods FROM userown WHERE guildId="${message.guild.id}"`

              const query = querytxt => {
                return new Promise((resolve, reject) => {
                    con.query(querytxt, (err, results, fields) => {
                    if (err) reject(err);
                    resolve([results, fields]);
                  });
                });
              };
              const [results, fields] = await query(blacklist);
            
              const map1 = results.map(results => `${bot.users.cache.get(results.user) || results.user}`);
              var blacklistlist = new MessageEmbed()
              .setTitle(`Owner`)
              .setColor(color)
              .setDescription(map1)
              message.channel.send(blacklistlist)
          } else {
              return message.channel.send('Mauvais argument !\n**Arguments possible :** add / remove / list')
          }
        });
    })
    } catch (e) {
        console.error;
        message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
};

module.exports.config = {
    name: "owner",
    aliases: ["own"],
    description: "Permet d'ajouter/supprimer un utilisateur aux owners et de voir la liste des owners du serveur",
    usage: "add <id / mention> / remove <id /mention> / list",
    commandCategory: "moderation",
    cooldownTime: '0'
};