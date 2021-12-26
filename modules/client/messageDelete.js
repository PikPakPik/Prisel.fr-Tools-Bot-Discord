var getNow = () => { return {time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}};
const { dbConnect } = require('./../../handlers/MYSQL.js');
let con;
con = dbConnect();

module.exports = async (client, message) => {
    con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT gs.messageLogs, gs.messagelogsChannel FROM guildSettings as gs WHERE gs.guildId ="${message.guild.id}"`, async (e, row) => {
            messageLogs = row != null ? row[0].messageLogs : 'null';
            messagelogsChannel = row != null ? row[0].messagelogsChannel : 'null';
        if (e) return;
    if(!message.guild) return;
    if(messageLogs === false) return;
    str_chan = message.guild.channels.cache.find(c => c.id === messagelogsChannel)
    if(!str_chan) return;

    
    // --
    var fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
    }),
    deletionLog = fetchedLogs.entries.first();
    if(!deletionLog) return str_chan.send({embed:{ description: ` **${message.author.username}**#${message.author.discriminator} (\`${message.author.id}\`) a supprimé son message dans [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) \n  \`\`\`${message.content}\`\`\``, color: "#2f3136", author: { name: "❌ Suppression" }, footer: { text: `🕙 ${getNow().time}` } }}) 
    const { executor, target } = deletionLog;    
    if (target.id === message.author.id) {
    str_chan.send({embed:{ description: ` **${executor.username}**#${executor.discriminator} (\`${executor.id}\`) a supprimé le message de **${message.author.username}**#${message.author.discriminator} (\`${message.author.id}\`) dans [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) \n \`\`\`${message.content}\`\`\``, color: "#2f3136", author: { name: "❌ Suppression" }, footer: { text: `🕙 ${getNow().time}` } }}) 
    } else { 
    str_chan.send({embed:{ description: ` **${message.author.username}**#${message.author.discriminator} (\`${message.author.id}\`) a supprimé son message dans [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) \n  \`\`\`${message.content}\`\`\``, color: "#2f3136", author: { name: "❌ Suppression" }, footer: { text: `🕙 ${getNow().time}` } }}) 
    }
})
});
    };