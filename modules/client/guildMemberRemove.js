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
    if(serverLogs === false) {
        return;
    } else {

        const 
    fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1, 
		type: 'MEMBER_KICK',
    });
    if (fetchedLogs) {
        const kickLog = fetchedLogs.entries.first()
    if (!kickLog) return;

    const { executor, target } = kickLog;
    const guys = member.guild.member(executor.id);
    const mmember = member.guild.member(target.id);


    str_chan = member.guild.channels.cache.find(c => c.id === serverlogsChannel)
    if(!str_chan) return;
    str_chan.send({embed:{ description: `**${mmember.user.username}**#${mmember.user.discriminator} (\`${mmember.user.id}\`) a été kick par **${guys.user.username}**#${guys.user.discriminator} (\`${guys.user.id}\`) ! \n **Rôles:** \`\`\`${mmember.roles.cache.map(r => r.name).join(", ")}\`\`\``, color: color, author: { name: "👢 Kick d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 

        return;
    }


        str_chan = member.guild.channels.cache.find(c => c.id === serverlogsChannel)
        if(!str_chan) return;
    str_chan.send({embed:{ description: `**${member.user.username}**#${member.user.discriminator} (\`${member.user.id}\`) a quitté le serveur! \n **Rôles:** \`\`\`${member.roles.cache.map(r => r.name).join(", ")}\`\`\``, color: color, author: { name: "👋 Perte d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
    }
})})
};