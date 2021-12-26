const create = require('../../handlers/createDB');
const { dbConnect } = require('./../../handlers/MYSQL.js');
const { MessageEmbed } = require('discord.js')
let con;
con = dbConnect();
module.exports = async (bot) => {
  await create.createDb();
  bot.user.setActivity(`Prisel.fr Tools By 𝔸𝕝𝕖𝕩`, {type: 'COMPETING'});
  const { addDbEntry } = require('../../handlers/addDBserver');
  bot.guilds.cache.forEach(async guild => {
    const guildId = guild.id;
    await addDbEntry(guildId);
    console.log('Added guild with ID: ' + guildId)
  });
  console.log(`${bot.user.username} loaded. Currently in ${bot.guilds.cache.size} server(s) with ${bot.users.cache.size} users.`);

  // COUNTER 
  var interval = setInterval (function () {
  bot.guilds.cache.forEach(guild => {
    con.query(`SELECT c.guildId, c.status, c.total, c.totalformat, c.online, c.onlineformat, c.vocal, c.vocalformat, c.boost, c.boostformat FROM Counter as c WHERE c.guildId ="${guild.id}"`, async (e, row) => {
    total = row != null ? row[0].total : 'null';
    totalFormat = row != null ? row[0].totalformat : 'null';
    online = row != null ? row[0].online : 'null';
    onlineFormat = row != null ? row[0].onlineformat : 'null';
    vocal = row != null ? row[0].vocal : 'null';
    vocalFormat = row != null ? row[0].vocalformat : 'null';
    boost = row != null ? row[0].boost : 'null';
    boostFormat = row != null ? row[0].boostformat : 'null';
    status = row != null ? row[0].status : 'null';
    guildid = row != null ? row[0].guildId : 'null';

    var guild = bot.guilds.cache.get(guildid)
    if(!guild) return;
    if(!status === false) { 
    var total = guild.channels.cache.get(total)
    if(total) total.setName(totalFormat.replace(`<count>`, guild.memberCount)).catch(console.error)

        var vocal = guild.channels.cache.get(vocal)
        if(vocal) vocal.setName(vocalFormat.replace(`<count>`, guild.members.cache.filter(m => m.voice.channel).size)).catch(console.error)
    
    
        var online = guild.channels.cache.get(online)
        if(online) online.setName(onlineFormat.replace(`<count>`, guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size)).catch(console.error)
    
        var boost = guild.channels.cache.get(boost)
        if(boost) boost.setName(boostFormat.replace(`<count>`, guild.premiumSubscriptionCount)).catch(console.error)
    }

  })
})
  })
  bot.guilds.cache.forEach(guild => {
    con.query(`SELECT c.guildId, c.status, c.total, c.totalformat, c.online, c.onlineformat, c.vocal, c.vocalformat, c.boost, c.boostformat FROM Counter as c WHERE c.guildId ="${guild.id}"`, async (e, row) => {
    total = row != null ? row[0].total : 'null';
    totalFormat = row != null ? row[0].totalformat : 'null';
    online = row != null ? row[0].online : 'null';
    onlineFormat = row != null ? row[0].onlineformat : 'null';
    vocal = row != null ? row[0].vocal : 'null';
    vocalFormat = row != null ? row[0].vocalformat : 'null';
    boost = row != null ? row[0].boost : 'null';
    boostFormat = row != null ? row[0].boostformat : 'null';
    status = row != null ? row[0].status : 'null';
    guildid = row != null ? row[0].guildId : 'null';

    var guild = bot.guilds.cache.get(guildid)
    if(!guild) return;
    if(!status === false) { 
    var total = guild.channels.cache.get(total)
    if(total) total.setName(totalFormat.replace(`<count>`, guild.memberCount)).catch(console.error)

        var vocal = guild.channels.cache.get(vocal)
        if(vocal) vocal.setName(vocalFormat.replace(`<count>`, guild.members.cache.filter(m => m.voice.channel).size)).catch(console.error)
    
    
        var online = guild.channels.cache.get(online)
        if(online) online.setName(onlineFormat.replace(`<count>`, guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size)).catch(console.error)
    
        var boost = guild.channels.cache.get(boost)
        if(boost) boost.setName(boostFormat.replace(`<count>`, guild.premiumSubscriptionCount)).catch(console.error)
    }

  })
})
};