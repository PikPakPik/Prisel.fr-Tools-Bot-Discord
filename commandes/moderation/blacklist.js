const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, con) => {
    try {
      con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT guildMods FROM usermod WHERE guildId ="${message.guild.id}"`, async (e, rows) => {
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
                  con.query(`SELECT u.user FROM userbl AS u WHERE u.guildId="${message.guild.id}"`, (err, rows) => { 
                      if(err) throw err;
                      if(!rows.length) {  
                        con.query(`INSERT INTO userbl (guildId, user) VALUES (?, ?)`, [message.guild.id, member.id]);
                          message.channel.send(`**${member.user.username}** est désormai blacklist`)
                          con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                            row = row[0];
                            const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Blacklist :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Blacklist:`, member.user.username)
                              .addField(`Blacklist par:`, message.author.username)
                              .addField(`Blacklist le:`, new Date().toDateString())
                              .setColor(color)
                              .setFooter(bot.user.username);
                            if (row.logsEnabled !== "true") return;
                            message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                          });
                          return member.ban(`Blacklist | Admin : ${message.author.username}`).then(message.channel.send(`${member.user.username} vient d'être banni`))
                          
                      } else {  
                          return message.channel.send(`**${member.user.username}** est déjà blacklist`);
  
                      }
                  });
              } else {
                con.query(`SELECT u.user FROM userbl AS u WHERE (u.guildId="${message.guild.id}" AND u.user="${memberr}")`, (err, rows) => { 
                      if(err) throw err;
                      if(!rows.length) {  
                        con.query(`INSERT INTO userbl (guildId, user) VALUES (?, ?)`, [message.guild.id, memberr]);
                          message.channel.send(`**${memberr}** est désormai blacklist`)
                          con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                            row = row[0];
                            const LogsEmbed = new MessageEmbed()
                              .setTitle(`:hammer: Membre Blacklist :hammer:`)
                              .setAuthor(message.author.tag, message.author.avatarURL)
                              .addField(`Membre Blacklist:`, memberr)
                              .addField(`Blacklist par:`, message.author.username)
                              .addField(`Blacklist le:`, new Date().toDateString())
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
              con.query(`SELECT u.user FROM userbl AS u WHERE (u.guildId="${message.guild.id}" AND u.user="${args[1]}")`, (err, rows) => { 
                  if(err) throw err;
                  if(rows.length) {  
                      con.query(`DELETE FROM userbl WHERE (guildId="${message.guild.id}" AND user="${args[1]}")`);
                      con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
                        row = row[0];
                        const LogsEmbed = new MessageEmbed()
                          .setTitle(`:hammer: Membre UnBlacklist :hammer:`)
                          .setAuthor(message.author.tag, message.author.avatarURL)
                          .addField(`Membre UnBlacklist:`, memberr)
                          .addField(`UnBlacklist par:`, message.author.username)
                          .addField(`UnBlacklist le:`, new Date().toDateString())
                          .setColor(color)
                          .setFooter(bot.user.username);
                        if (row.serverLogs !== "true") return;
                        message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
                      });
                      return message.channel.send(`**${args[1]}** n'est désormai plus blacklist`);
                  } else {  
                      return message.channel.send(`**${args[1]}** n'est pas blacklist`);
                  }
              });
          } else if(args[0].toLowerCase() === 'list') {
              const blacklist = `SELECT user FROM userbl WHERE guildId="${message.guild.id}"`

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
              .setTitle(`Blacklist`)
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
        funcs.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
};

module.exports.config = {
    name: "blacklist",
    aliases: ["bl", "b"],
    description: "Utilisez cette commande pour mettre un utilisateur sur la blacklist et lui interdire l'accès au serveur",
    usage: "<id / mention>",
    commandCategory: "moderation",
    cooldownTime: '0'
};