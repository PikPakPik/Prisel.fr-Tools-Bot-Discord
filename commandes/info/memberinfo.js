  
const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone');
const { stripIndents } = require("common-tags");

module.exports.run = async (bot, message, args, con) => {
  try {


    const status = {
        online: "En Ligne",
        idle: "Absent",
        dnd: "Ne pas déranger",
        offline: "Hors ligne/Invisible"
      };
        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;

        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };

        const roles = member.roles
            .cache.filter(r => r.id !== message.guild.id)
            .map(r => r).join(" , ") || 'none';

            const activities = [];
    let customStatus;
    for (const activity of member.presence.activities.values()) {
      switch (activity.type) {
        case 'PLAYING':
          activities.push(`Playing **${activity.name}**`);
          break;
        case 'LISTENING':
          if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
          else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
          break;
        case 'WATCHING':
          activities.push(`Watching **${activity.name}**`);
          break;
        case 'STREAMING':
          activities.push(`Streaming **${activity.name}**`);
          break;
        case 'CUSTOM_STATUS':
          customStatus = activity.state;
          break;
      }
    }


            const userFlags = member.user.flags.toArray();
        const userembed = new MessageEmbed()
        .setColor(3092790)
            .setFooter(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Informations du membre :', stripIndents`**> Nom :** ${member.displayName}
            **> Serveur rejoins :** ` + moment(member.joinedAt).tz("Europe/Paris").format('DD/MM/YYYY hh:mm:ss') + ' (**il y a ' + moment(new Date()).diff(member.joinedAt, 'days') + ' jours**)' + `
            **> Roles :** ${roles}`, true)

            .addField(`Informations de l'utilisateur :`, stripIndents`**> ID :** ${member.user.id}
            **> Nom d'utilisateur :** ${member.user.username}
            **> Tag :** ${member.user.tag}
            **> Avatar:** [Lien vers l'avatar](${member.user.displayAvatarURL({ dynamic: true })})
            **> Badge(s) :** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Aucuns badges'}
            **> Compte crée :** ` + moment(member.user.createdAt).tz("Europe/Paris").format('DD/MM/YYYY hh:mm:ss') + ' (**il y a ' + moment(new Date()).diff(member.user.createdAt, 'days') + ' jours**)', true)
            .setTimestamp()
            if (activities.length > 0) embed.addField(activities.join('\n'));
            if (customStatus) embed.addField('Custom Status', customStatus);

        message.channel.send(userembed);
    } catch (e) {
        console.error;
        message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
};

module.exports.config = {
    name: "memberinfo",
    aliases: ["uinfo", "user", "minfo"],
    usage: "<@membre / id>",
    description: "Avoir les statistiques du serveur.",
    commandCategory: "info"
};