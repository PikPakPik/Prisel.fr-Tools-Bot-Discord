
const { dbConnect } = require('./../../handlers/MYSQL.js');
let con;
con = dbConnect();

module.exports = async (bot, oldPresence, newPresence) => {
    con.query(`SELECT s.status, s.role, s.statut FROM statut as s WHERE s.guildId ="${newPresence.guild.id}"`, async (e, row) => {
        try {
        status = row != null ? row[0].status : 'null';
        rolea = row != null ? row[0].role : 'null';
        statut = row != null ? row[0].statut : 'null';
    if(status === "false") return;

    var role = newPresence.guild.roles.cache.find(r => r.id === rolea);
    if(!role) return;
    if(newPresence.user.presence.activities[0]) {
    if(newPresence.user.presence.activities[0].state === statut) { 
        console.log(newPresence.user.tag + " à changé son Custom Status en " + newPresence.user.presence.activities[0].state)
    if(!newPresence.member.roles.cache.some(r => r.id === rolea)) {
    newPresence.member.roles.add(role)
    .catch(e => console.log(e))
    }
    } else {
    if(newPresence.member.roles.cache.some(r => r.id === rolea)) {
    newPresence.member.roles.remove(role)
    }
    }
    } else { 
        var role = newPresence.guild.roles.cache.find(role => role.id === rolea);
        if(newPresence.member.roles.cache.some(r => r.id === rolea)) {
            newPresence.member.roles.remove(role)
            }
    }
} catch(err) {
    // Handle the error ...
    return
}
})
};
