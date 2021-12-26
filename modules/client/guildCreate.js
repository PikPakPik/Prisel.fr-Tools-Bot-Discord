const create = require('../../handlers/addDBserver');

module.exports = async (bot, guild) => {
    try {
        const guildId = guild.id;
        await create.addDbEntry(guildId);
        console.log(`Le serveur ${guild.name}: (${guild.id}) à bien été créer dans la base de données.`);
    } catch (err) {
        console.log(err);
    }
};