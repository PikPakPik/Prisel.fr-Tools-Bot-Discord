const {  MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, con) => {
  try {
    con.query(`SELECT gp.color, gp.prefix FROM Bot as gp WHERE guildId ='${message.guild.id}'`, async (e, row) => {
      color = row != null ? row[0].color : '#3A73A0';
      message.channel.send(`***Saisissez le premier objet à choisir ou tapez exit pour annuler.***`)
        .then(() => {
          message.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 30000,
              errors: ['time'],
            })
            .then((obj1) => {
              if (!obj1) return;
              obj1 = obj1.array()[0];
              message.channel.send(`***Maintenant, entrez le deuxième objet.***`)
                .then(() => {
                  message.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 30000,
                      errors: ['time'],
                    })
                    .then((obj2) => {
                      if (!obj2) return;
                      obj2 = obj2.array()[0];
                      if (obj2.content == obj1.content) return message.channel.send(`On ne peut pas choisir entre la même chose.`);
                      let random = Math.floor(Math.random() * 100);
                      //let random1 = Math.floor(Math.random() * 100);
                      let obj1chance = 100 - random;
                      let obj2chance = 100 - obj1chance;
                      if (obj1chance > obj2chance) {
                        let embed = new  MessageEmbed()
                          .setTimestamp()
                          .setColor(color)
                          .setTitle(`J'ai choisi...`)
                          .setDescription(`Objet choisi : ${obj1.content}`)
                          .addField(`Possibilité de choisir ${obj1.content}:`, `${obj1chance}%`)
                          .addField(`Possibilité de choisir ${obj2.content}:`, `${obj2chance}%`)
                          .setThumbnail(bot.user.avatarURL);
                        message.channel.send(embed);
                      } else if (obj1chance < obj2chance) {
                        let embed = new  MessageEmbed()
                          .setTimestamp()
                          .setColor(color)
                          .setTitle(`J'ai choisi...`)
                          .setDescription(`Objet choisi : ${obj2.content}`)
                          .addField(`Possibilité de choisir ${obj1.content}:`, `${obj1chance}%`)
                          .addField(`Possibilité de choisir ${obj2.content}:`, `${obj2chance}%`)
                          .setThumbnail(bot.user.avatarURL);
                        message.channel.send(embed);
                      } else {
                        let embed = new  MessageEmbed()
                          .setTimestamp()
                          .setColor(color)
                          .setTitle(`J'ai choisi...`)
                          .setDescription(`C'était une égalité ! J'ai choisi les deux !`)
                          .addField(`Possibilité de choisir ${obj1.content}:`, `${obj1chance}%`)
                          .addField(`Possibilité de choisir ${obj2.content}:`, `${obj2chance}%`)
                          .setThumbnail(bot.user.avatarURL);
                        message.channel.send(embed);
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                      message.channel.send(`Le temps est écoulé.`);
                    });
                });
            })
            .catch((e) => {
              console.log(e);
              message.channel.send(`Le temps est écoulé.`);
            });
        });
      })
  } catch (e) {
    console.error;
    message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
  }
};

module.exports.config = {
  name: "random",
  aliases: ["aleatoire", "rdm"],
  description: "Aléatoire.",
  usage: "",
  commandCategory: "fun",
  cooldownTime: '5'
};