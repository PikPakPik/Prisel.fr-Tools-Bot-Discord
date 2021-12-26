const { readdirSync } = require("fs");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, con) => {
  con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
    color = row != null ? row[0].color : '#3A73A0';
    prefix = row != null ? row[0].prefix : 'p!';
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {

      const embed = new MessageEmbed()

      .setFooter(
        `Demandé par ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(color)
      .setTitle("📬 Besoin d'aide ? Voici toutes mes commandes :")
      .setDescription(`Utilisez \`${prefix}help\` suivi d'un nom de commande pour obtenir plus d'informations supplémentaires sur une commande. Par exemple : \`${prefix}help guildinfo\`.\n
      ${[...bot.categories].map(
        (value) => 
        `**${value.slice(0).toUpperCase()}** *${bot.commands.filter(
          (cmd) => cmd.config.commandCategory == value
          ).size
        } commandes*\n${bot.commands
          .filter((cmd) => cmd.config.commandCategory == value)
          .map((value) => `\`${value.config.name}\``)
          .join(", ")}`
          )
          .join("\n\n")}
          `)
        
        message.channel.send(embed)

      /*
      readdirSync("./commandes/").forEach((dir) => {
        const commands = readdirSync(`./commandes/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commandes/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);*/
    } else {
      const command =
        bot.commands.get(args[0].toLowerCase()) ||
        bot.commands.find(
          (c) => c.config.aliases && c.config.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle(`Détails de la commande \`${command.config.name}\`:`)
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMANDE:",
          command.config.name ? `\`${command.config.name}\`` : "No name for this command."
        )
        .addField(
          "CATEGORIE:",
          command.config.commandCategory
            ? `\`${command.config.commandCategory}\``
            : `\`Aucune catégorie attribuée\``
        )
        .addField(
          "ALIASES:",
          command.config.aliases
            ? `\`${command.config.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "UTILISATION:",
          command.config.usage
            ? `\`${prefix}${command.config.name} ${command.config.usage}\``
            : `\`${prefix}${command.config.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.config.description
            ? command.config.description
            : "No description for this command."
        )
        .setFooter(
          `Demandé par ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(color);
      return message.channel.send(embed);
    }
})
};

module.exports.config = {
  name: "help",
  aliases: ["h", "commandes"],
  usage: "",
  description: "Utilisez cette commande pour obtenir de l'aide.",
  commandCategory: "info"
};