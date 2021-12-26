const { richEmbed } = require('discord.js');
module.exports.run = (bot, message, args, con) => {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
        color = row != null ? row[0].color : '#3A73A0';
    const question = args.join(` `);
    if (!question) return funcs.send(`You did not provide a question!`, true);
    const responses = [
        `● C'est certain.`,
        `● C'est décidément le cas.`,
        `● Sans aucun doute. `,
        `● Oui - définitivement.`,
        `● Vous pouvez vous y fier.`,
        `● Comme je le vois, oui.`,
        `● Très probablement.`,
        `● Les perspectives sont bonnes. `,
        `● Oui.`,
        `● Les signes indiquent que oui.`,
        `● Réponse floue, essayez à nouveau.`,
        `● Redemandez plus tard.`,
        `● Mieux vaut ne pas vous le dire maintenant.`,
        `● On ne peut pas prédire maintenant.`,
        `● Concentrez-vous et demandez à nouveau.`,
        `● Ne comptez pas dessus.`,
        `● Ma réponse est non.`,
        `● Mes sources disent non.`,
        `● Les perspectives ne sont pas très bonnes.`,
        `● Très douteux. `
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    const embed = new richEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor(color)
        .setFooter(bot.user.username)
        .setTitle(`8ball`)
        .addField(`Question:`, question.endsWith("?") ? question : question + "?", true)
        .addField(`Réponse:`, response, true)
        .setThumbnail(message.author.avatarURL);
    message.channel.send(embed);
})
};

module.exports.config = {
    name: "8ball",
    aliases: [],
    description: "Utilisez cette commande pour accéder à la boule magique.",
    usage: "<question>",
    commandCategory: "fun",
    cooldownTime: '5'
};