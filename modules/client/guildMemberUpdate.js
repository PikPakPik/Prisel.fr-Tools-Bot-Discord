var getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; },
fs = require("fs");
const { dbConnect } = require('./../../handlers/MYSQL.js');
let con;
con = dbConnect();

module.exports = async (member, oldMember, newMember) => {
    con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${newMember.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT gs.roleLogs, gs.rolelogsChannel FROM guildSettings as gs WHERE gs.guildId ="${newMember.guild.id}"`, async (e, row) => {
            roleLogs = row != null ? row[0].roleLogs : 'null';
            rolelogsChannel = row != null ? row[0].rolelogsChannel : 'null';
        if (e) return;
if(roleLogs === false) return;
str_chan = newMember.guild.channels.cache.find(c => c.id === rolelogsChannel)
if(!str_chan) return;

const fetchedLogs = await oldMember.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_ROLE_UPDATE',
}),
deletionLog = fetchedLogs.entries.first();

if(!deletionLog) return;
// -- New roles
if(oldMember.roles.cache.size < newMember.roles.cache.size) {
let newroles = null;
deletionLog.changes.forEach(r => {
    newroles = r.new
});


if (!deletionLog) return;
const { executor, target } = deletionLog;

str_chan.send({embed: { description: `**${executor.username}**#${executor.discriminator} (\`${executor.id}\`) a donné à **${newMember.user.username}**#${newMember.user.discriminator} (\`${newMember.user.id}\`) le(s) rôle(s): \`\`\`${newroles.map(r => r.name).join(", ")}\`\`\``, author: { name: `➕ Ajout de rôle a un membre` }, color: color, footer: { text: `🕙 ${getNow().time}` }} });

} else if(oldMember.roles.cache.size > newMember.roles.cache.size) {
let oldroles = null;
deletionLog.changes.forEach(r => {
    oldroles = r.new
});
if (!deletionLog) return;
const { executor, target } = deletionLog;
str_chan.send({embed: { description: `**${executor.username}**#${executor.discriminator} (\`${executor.id}\`) a retiré à **${newMember.user.username}**#${newMember.user.discriminator} (\`${newMember.user.id}\`) le(s) rôle(s): \`\`\`${oldroles.map(r => r.name).join(", ")}\`\`\``, author: { name: `➖ Perte d'un rôle a un membre` }, color: color, footer: { text: `🕙 ${getNow().time}` }} });

}
    });
})};


