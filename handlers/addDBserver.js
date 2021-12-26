const { dbConnect } = require('./MYSQL.js');

let con;
con = dbConnect();

module.exports = {
    addDbEntry: (guildId) => {
        con.query(`SELECT * FROM Bot WHERE guildId ="${guildId}"`, (e, row) => {
            if (row.length == 0) {
                con.query(`INSERT INTO Bot (guildId, prefix, color) VALUES (?, ?, ?)`, [guildId, "p!", "#3A73A0"]);
            }
        });
        con.query(`SELECT * FROM guildSettings WHERE guildId ="${guildId}"`, (e, row) => {
            if (row.length == 0) {
                con.query(`INSERT INTO guildSettings (guildId, serverLogs, serverlogsChannel, vocalLogs, vocallogsChannel, roleLogs, rolelogsChannel, messageLogs, messagelogsChannel, muteRole) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [guildId, "false", "none", 'false', 'none', "false", "none", 'false', 'none', 'Muted']);
            }
        });
        con.query(`SELECT * FROM guildAutoModeration WHERE guildId ="${guildId}"`, (e, row) => {
            if (row.length == 0) {
                con.query(`INSERT INTO guildAutoModeration (guildId, antiWebsites, antiInvites, antiAscii, antiCapslock, antiDuplicates, antiPing, antiSelfBot, ignoreChannels, IgnoreRoles, warnOnAutoMod) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [guildId, "false", "false", "false", "false", "false", "false", "false", "none", "none", "false"]);
            }
        });
        con.query(`SELECT * FROM Counter WHERE guildId ="${guildId}"`, (e, row) => {
          if (row.length == 0) {
              con.query(`INSERT INTO Counter (guildId, status, total, totalformat, online, onlineformat, vocal, vocalformat, boost, boostformat) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?)`, [guildId, "false", "none", "Membres: <count>", "none", "En ligne: <count>", "none", "En vocal: <count>", "none", "Boost: <count>"]);
          }
      });
    },
    addDbEntryUserId: (guildId, userId, action) => {
        const muteCount = action == 'mute' ? 1 : 0;
        const warnCount = action == 'warn' ? 1 : 0;
        const kickCount = action == 'kick' ? 1 : 0;
        const banCount = action == 'ban' ? 1 : 0;
        const reportCount = action == 'report' ? 1 : 0;
        con.query(`SELECT * FROM userPunishments WHERE guildId ="${guildId}" AND userId ="${userId}"`, (e, row) => {
            if (!row || row.length == 0) {
                con.query(`INSERT INTO userPunishments(guildId, userId, warnings, kicks, mutes, bans, reports) VALUES (?, ?, ?, ?, ?, ?, ?)`, [guildId, userId, warnCount, kickCount, muteCount, banCount, reportCount]);
            }
        });
    },
    addafterbanUserId: (guildId, userId) => {
        con.query(`SELECT * FROM Banafter WHERE guildId ="${guildId}" AND userId ="${userId}"`, (e, row) => {
            if (!row || row.length == 0) {
                con.query(`INSERT INTO Banafter(guildId, userId) VALUES (?, ?)`, [guildId, userId]);
            }
        });
    }
};