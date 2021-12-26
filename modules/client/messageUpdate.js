var getNow = () => { return {time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}};
const { dbConnect } = require('./../../handlers/MYSQL.js');
let con;
con = dbConnect();
module.exports = (client, oldMessage, newMessage) => {
    con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${newMessage.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
        con.query(`SELECT gs.messageLogs, gs.messagelogsChannel FROM guildSettings as gs WHERE gs.guildId ="${newMessage.guild.id}"`, async (e, row) => {
            messageLogs = row != null ? row[0].messageLogs : 'null';
            messagelogsChannel = row != null ? row[0].messagelogsChannel : 'null';
    if(!oldMessage.guild) return;
    if(messageLogs === false) return;
    str_chan = newMessage.guild.channels.cache.find(c => c.id === messagelogsChannel)
    if(!str_chan) return;


    // --
    if(!newMessage.author) return;

    if(oldMessage.content === newMessage.content) return;
    if(oldMessage.author.bot) return;

    
    str_chan.send({embed:{ description: `**${oldMessage.author.username}**#${oldMessage.author.discriminator} (\`${oldMessage.author.id}\`) a édité son message dans [\`${oldMessage.channel.name}\`](https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}) \n  **Avant**: \`\`\`${oldMessage.content}\`\`\` **Après:** \`\`\`${newMessage.content}\`\`\``, color: color, author: { name: "📝 Editions" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        })})
    };