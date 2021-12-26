var getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; },
fs = require("fs");
const { dbConnect } = require('./../../handlers/MYSQL.js');
let con;
con = dbConnect();




module.exports = async (client, member) => {
  con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
    color = row != null ? row[0].color : '#3A73A0';
    con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings as gs WHERE gs.guildId ="${message.guild.id}"`, async (e, row) => {
      serverLogs = row != null ? row[0].serverLogs : 'null';
      serverlogsChannel = row != null ? row[0].serverlogsChannel : 'null';
if(serverLogs !== false) { 
str_chan = member.guild.channels.cache.find(c => c.id === serverlogsChannel)
str_chan.send({embed:{ description: `**${member.user.username}**#${member.user.discriminator} (\`${member.user.id}\`) a rejoins le serveur!\n`, color: db.color, author: { name: "🙌 Nouveau membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
} 

con.query(`SELECT u.user FROM userbl AS u WHERE (u.guildId="${message.guild.id}" AND u.user="${member.id}")`, (err, rows) => { 
  if(err) throw err;
  console.log('gooo')
  if(rows.length) {
    member.ban('Blacklist')
    con.query(`SELECT gs.serverLogs, gs.serverlogsChannel FROM guildSettings AS gs WHERE gs.guildId="${message.guild.id}"`, (e, row) => {
      row = row[0];
      const LogsEmbed = new MessageEmbed()
        .setTitle(`:hammer: Membre Blacklist :hammer:`)
        .setDescription(`Cet utilisateur à essayer de rejoindre le serveur alors qu'il était blacklist et à donc été banni du serveur !`)
        .addField(`Membre Blacklist:`, memberr)
        .setColor(color)
        .setFooter(bot.user.username);
      if (row.serverLogs !== "true") return;
      message.guild.channels.cache.get(row.serverlogsChannel).send(LogsEmbed);
    })
  }
})
/*
if(db.autorole.module === true) {
role = member.guild.roles.cache.find(c => c.id === db.autorole.role)
member.roles.add(role.id)
}*/


})
  })

}