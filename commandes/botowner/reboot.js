module.exports.run = (bot, message, args, funcs) => {
    if (message.author.id !== "710438426788233256") return;
    message.channel.send(':check:')
    process.exit(1);
};

module.exports.config = {
  name: "reboot",
  aliases: [""],
  usage: "",
  commandCategory: "Administration",
  description: "Reboot Forcé"
};