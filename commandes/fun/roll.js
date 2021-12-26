module.exports.run = async (bot, message, args) => {
      try {
        let num = parseInt(args.join(` `));
        if (!num) return message.channel.send(`Veuillez fournir un numéro pour lancer les dés !`);
        if (isNaN(num)) return message.channel.send(`Ce n'est pas un nombre valide pour rouler.`);
        if(num > 6) return message.channel.send(`Veuillez choisir un numéro plus petit ou égal à 6.`);
        if (!isFinite(num)) return message.channel.send(`On ne peut pas lancer un nombre infini.`);
        let dice = Math.floor(Math.random() * num) + 1;
        message.channel.send(`Les dés sont jetés : ${dice}`);
      } catch (e) {
        console.error;
        message.channel.send(`Oh no, an error occurred!\n${e.message}`);
      }
};

module.exports.config = {
  name: "dé",
  aliases: ["roll"],
  description: "Lancer les dés.",
  usage: "<chiffre>",
  commandCategory: "fun",
  cooldownTime: '5'
};