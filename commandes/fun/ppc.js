const {
    richEmbed
} = require('discord.js');

module.exports.run = (bot, message, args) => {
    const validPicks = ["pierre", "papier", "ciseaux"];
    const userPick = args.join(` `).toLowerCase();
    if (!validPicks.includes(userPick) || !userPick) return message.channel.send(`Votre choix n'était ni pierre, ni papier, ni ciseaux!`, true);
    const botPicked = validPicks[Math.floor(Math.random() * validPicks.length)];
    //Rock
    if (userPick == "pierre" && botPicked == "pierre") return message.channel.send(`Vous avez choisi pierre et j'ai aussi choisi pierre. C'est une égalité !`);
    if (userPick == "pierre" && botPicked == "papier") return message.channel.send(`Vous avez choisi pierre et j'ai choisi papier. Je t'ai battu ! :sweat_smile:`);
    if (userPick == "pierre" && botPicked == "ciseaux") return message.channel.send(`Vous avez choisi pierre et j'ai choisi ciseaux. Tu m'as battu ! :rage:`);
    //Paper
    if (userPick == "papier" && botPicked == "papier") return message.channel.send(`Vous avez choisi ${userPick} et j'ai choisi ${botPicked}. C'est un match nul !`);
    if (userPick == "papier" && botPicked == "pierre") return message.channel.send(`Vous avez choisi ${userPick} et j'ai choisi ${botPicked}. Tu m'as battu ! :rage:`);
    if (userPick == "papier" && botPicked == "scrissors") return message.channel.send(`Vous avez choisi ${userPick} et j'ai choisi ${botPicked}. Je vous ai battu ! :sweat_smile:`);
    //Scrissors
    if (userPick == "ciseaux" && botPicked == "ciseaux") return message.channel.send(`Vous avez choisi ${userPick} et j'ai choisi ${botPicked}. C'est un match nul !`);
    if (userPick == "ciseaux" && botPicked == "pierre") return message.channel.send(`Vous avez choisi ${userPick} et j'ai choisi ${botPicked}. Je vous ai battu ! :sweat_smile:`);
    if (userPick == "ciseaux" && botPicked == "papier") return message.channel.send(`Vous avez choisi ${userPick} et j'ai choisi ${botPicked}. Tu m'as battu ! :rage:`);
};

module.exports.config = {
    name: "ppc",
    aliases: [],
    description: "Utilisez cette commande pour jouer au pierre, papier, ciseaux avec le bot.",
    usage: "<pierre / papier / ciseaux>",
    commandCategory: "fun",
    cooldownTime: '5'
};