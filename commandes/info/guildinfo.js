const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone');
module.exports.run = async (bot, message, args, con) => {
  con.query(`SELECT gp.color FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
    color = row != null ? row[0].color : '#3A73A0';
    try {
      function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " jour" : " jours");
    };
        let verifLevels = {
          "NONE": "Rien",
          "LOW": "Bas",
          "MEDIUM": "Moyen",
          "HIGH": "Haut",
          "VERY_HIGH": "SÉCURITÉ TAH LEWANDOWSKI"
        }
        let region = {
            "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa",
        "europe": ":flag_eu: Europe",
        "india": ":flag_in: India"
        };
        
        var emojis;
        if (message.guild.emojis.cache.size === 0) {
            emojis = 'None';
        } else {
            emojis = message.guild.emojis.cache.size;
        }

        const inviteBanner = message.guild.bannerURL({
            size: 2048,
            format: "png",
            dynamic: true,
        });
        
        const IconServer = message.guild.iconURL({
            format: "png",
            dynamic: true,
        });
        
    
        const embed = new MessageEmbed()
        .setAuthor(message.guild.name, IconServer ? IconServer : bot.user.displayAvatarURL())
        .setThumbnail(IconServer)
        .setTimestamp()
        .addField("Date de création", `${moment(message.guild.createdAt).tz("Europe/Paris").format('DD/MM/YYYY hh:mm:ss')},\n(${checkDays(message.guild.createdAt)})`, true)
        .addField("ID", message.guild.id, true)
        .addField("Créateur", message.guild.owner, true)
        .addField("Region", region[message.guild.region], true)
        .addField("Boosts", message.guild.premiumSubscriptionCount, true)
        .addField("Niveau", message.guild.premiumTier, true)
        .addField("Membres", message.guild.memberCount, true)
        .addField("Temps AFK", message.guild.afkTimeout / 60 + ' minutes', true)
        .addField("Roles", message.guild.roles.cache.size, true)
        .addField("Channels", message.guild.channels.cache.size, true)
        .addField("Emojis", `${emojis}`, true)
        .addField("Niveau de Sécurité", verifLevels[message.guild.verificationLevel], true)
        .setColor(color)
        .setFooter(`${message.guild.name} - 2021`, message.guild.iconURL({ dynamic: true }))
        .setImage(inviteBanner)
        message.channel.send({embed});
    } catch (e) {
        console.log(e);
        message.channel.send(`Oh no, an error occurred!\n${e.message}`);
    }
  })
};

module.exports.config = {
    name: "guildinfo",
    aliases: ["gi", "ginfo"],
    usage: "",
    description: "Avoir les statistiques du serveur.",
    commandCategory: "info"
};