const { dbConnect } = require('./MYSQL.js');

let con;
con = dbConnect();

module.exports = {
    createDb: () => {
        con.query(`CREATE TABLE IF NOT EXISTS Bot (guildId TEXT(30), prefix TEXT(30), color TEXT(30))`);
        con.query(`CREATE TABLE IF NOT EXISTS Counter (guildId TEXT(30), status TEXT(30), total TEXT(30), totalformat TEXT(50), online TEXT(30), onlineformat TEXT(50), vocal TEXT(30), vocalformat TEXT(50), boost TEXT(30), boostformat TEXT(50))`);
        con.query(`CREATE TABLE IF NOT EXISTS guildSettings (guildId TEXT(30), serverLogs TEXT(30), serverlogsChannel TEXT(30),  vocalLogs TEXT(30), vocallogsChannel TEXT(30), roleLogs TEXT(30), rolelogsChannel TEXT(30),  messageLogs TEXT(30), messagelogsChannel TEXT(30), muteRole TEXT(30))`);
        con.query(`CREATE TABLE IF NOT EXISTS punishments (guildId TEXT(30), reason TEXT(30), punishCount TEXT(30), action TEXT(30))`);
        // con.query(`CREATE TABLE IF NOT EXISTS guildList (guildId TEXT, user TEXT, username, TEXT)`);
        con.query(`CREATE TABLE IF NOT EXISTS userPunishments (guildId TEXT(30), userId TEXT(30), warnings INTEGER(255), kicks INTEGER(255), mutes INTEGER(255), bans INTEGER(255), reports INTEGER(255))`);
        con.query(`CREATE TABLE IF NOT EXISTS guildAutoModeration (guildId TEXT(30), antiWebsites TEXT(30), antiInvites TEXT(30), antiAscii TEXT(30), antiCapslock TEXT(30), antiDuplicates TEXT(30), antiPing TEXT(30), antiSelfBot TEXT(30), ignoreChannels TEXT(30), IgnoreRoles TEXT(30), warnOnAutoMod TEXT(30))`);
        con.query(`CREATE TABLE IF NOT EXISTS guildGiveaways (guildId TEXT(30), giveawayName TEXT(30), giveawayTime INTEGER(255), giveawayRunning BOOL, timeId TEXT(30), winnerCount INTEGER(255))`);
        con.query(`CREATE TABLE IF NOT EXISTS guildDisabledCreations (guildId TEXT(30), channelsEnabled TEXT(30), rolesEnabled TEXT(30))`);
        con.query(`CREATE TABLE IF NOT EXISTS afk (guildId TEXT(30), userId TEXT(30), isAfk BOOL, afkReason TEXT(500))`);
        con.query(`CREATE TABLE IF NOT EXISTS userbl (guildId TEXT(30), user TEXT(30))`);
        con.query(`CREATE TABLE IF NOT EXISTS usermod (guildId TEXT(30), guildMods TEXT(30))`);
        con.query(`CREATE TABLE IF NOT EXISTS userown (guildId TEXT(30), guildMods TEXT(30))`);
        //con.query(`CREATE TABLE IF NOT EXISTS guildTeamRoles ()`); //for andrew to fill wow thanks
        con.query(`CREATE TABLE IF NOT EXISTS userWarns (guildId TEXT(30), userId TEXT(30), warning TEXT(500), warnedAt TEXT, warnedBy TEXT(50), username TEXT(50), warnCount INTEGER(255))`);
        con.query(`CREATE TABLE IF NOT EXISTS botBugs (userId TEXT(30), bugMessage TEXT(255), bugReplied TEXT(30), bugId TEXT(30))`);
        con.query(`CREATE TABLE IF NOT EXISTS botBugsBlacklisted (guildId TEXT(30), userId TEXT(30))`);
        con.query(`CREATE TABLE IF NOT EXISTS guildMuteResume (guildId TEXT(30), userId TEXT(30), actualtime TEXT(30), time TEXT(30), muterole TEXT(30), channel TEXT(30))`);
        con.query(`CREATE TABLE IF NOT EXISTS Banafter (guildId TEXT(30), userId TEXT(30))`);
    }
};