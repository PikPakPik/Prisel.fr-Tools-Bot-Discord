const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, con) => {
    try {
      con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT guildMods FROM userown WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
          row = row[0];
    let row1 = rows.map(r => r.guildMods);
    if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);
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
                  con.query(`SELECT u.guildMods FROM usermod AS u WHERE u.guildId="${message.guild.id}"`, (err, rows) => { 
                      if(err) throw err;
                      if(!rows.length) {  
                        con.query(`INSERT INTO usermod (guildId, guildMods) VALUES (?, ?)`, [message.guild.id, member.id]);
                          message.channel.send(`**${member.user.username}** est désormai modérateur.`)
                          con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                            row = row[0];
                            const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Modérateur Add :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Modérateur:`, member.user.username)
                              .addField(`Add par:`, message.author.username)
                              .addField(`Add le:`, new Date().toDateString())
                              .setColor(color)
                              .setFooter(bot.user.username);
                            if (row.logsEnabled !== "true") return;
                            message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                          });
                          
                      } else {  
                          return message.channel.send(`**${member.user.username}** est déjà modérateur`);
  
                      }
                  });
              } else {
                con.query(`SELECT u.guildMods FROM usermod AS u WHERE (u.guildId="${message.guild.id}" AND u.guildMods="${memberr}")`, (err, rows) => { 
                      if(err) throw err;
                      if(!rows.length) {  
                        con.query(`INSERT INTO usermod (guildId, guildMods) VALUES (?, ?)`, [message.guild.id, memberr]);
                          message.channel.send(`**${memberr}** est désormai modérateur`)
                          con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                            row = row[0];
                            const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Modérateur Add :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Modérateur:`, memberr)
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
                con.query(`SELECT u.guildMods FROM usermod AS u WHERE (u.guildId="${message.guild.id}" AND u.guildMods="${member.id}")`, (err, rows) => { 
                  if(err) throw err;
                  if(rows.length) {  
                      con.query(`DELETE FROM usermod WHERE (guildId="${message.guild.id}" AND guildMods="${member.id}")`);
                      con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                        row = row[0];
                        const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Modérateur Remove :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Modérateur:`, member.user.username)
                              .addField(`Remove par:`, message.author.username)
                              .addField(`Remove le:`, new Date().toDateString())
                              .setColor(color)
                              .setFooter(bot.user.username);
                        if (row.serverLogs !== "true") return;
                        message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                      });
                      return message.channel.send(`**${member}** n'est désormai plus modérateur`);
                  } else {  
                      return message.channel.send(`**${member}** n'est pas modérateur`);
                  }
              });
              } else {
                con.query(`SELECT u.guildMods FROM usermod AS u WHERE (u.guildId="${message.guild.id}" AND u.guildMods="${args[1]}")`, (err, rows) => { 
                  if(err) throw err;
                  if(rows.length) {  
                      con.query(`DELETE FROM usermod WHERE (guildId="${message.guild.id}" AND guildMods="${args[1]}")`);
                      con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                        row = row[0];
                        const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Modérateur Remove :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Modérateur:`, memberr)
                              .addField(`Remove par:`, message.author.username)
                              .addField(`Remove le:`, new Date().toDateString())
                              .setColor(color)
                              .setFooter(bot.user.username);
                        if (row.serverLogs !== "true") return;
                        message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                      });
                      return message.channel.send(`**${args[1]}** n'est désormai plus modérateur`);
                  } else {  
                      return message.channel.send(`**${args[1]}** n'est pas modérateur`);
                  }
              });
              }
          } else if(args[0].toLowerCase() === 'list') {
              const blacklist = `SELECT guildMods FROM usermod WHERE guildId="${message.guild.id}"`

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
              .setTitle(`Modérateur`)
              .setColor(color)
              .setDescription(map1)
              message.channel.send(blacklistlist)
          } else {
              return message.channel.send('Mauvais argument !\n**Arguments possible :** add / remove / list')
          }
        });
      })
    })
    } catch (e) {
        console.error;
        message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
};

module.exports.config = {
    name: "mod",
    aliases: ["modd"],
    description: "Ajouter/supprimer un utilisateur aux modérateurs et de voir la liste des modérateurs du serveur",
    usage: "add <id / mention> / remove <id /mention> / list",
    commandCategory: "moderation",
    cooldownTime: '0'
};