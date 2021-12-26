const { MessageEmbed } = require("discord.js");
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
module.exports.run = (bot, message, args, con) => {
  con.query(`SELECT guildMods FROM usermod WHERE guildId ="${message.guild.id}"`, (e, rows) => {
    let row1 = rows.map(r => r.guildMods);
    if (!row1.includes(message.author.id)) return message.channel.send(`Vous n'avez pas la permission d'utliser cette commande.`);

    filter = (reaction, user) => ['✨','🔰','📚','📸','🗺','🌟','🌈','👤','✅'].includes(reaction.emoji.name) && user.id === message.author.id,
    dureefiltrer = response => { return response.author.id === message.author.id };
        var embed = new MessageEmbed()
        .setDescription('.')
        message.channel.send(embed).then(async m => {
            
message.channel.send(`
        ✨ Modifier le titre
🔰 Modifier la description
📚 Ajouter un field
📸 Modifier l'image
🗺 Modifier le thumbnail
🌟 Modifier le footer
🌈 Modifier la couleur
👤 Modifier l'auteur
:white_check_mark: Envoyer l'embed`).then(async ins => {
                const collector = ins.createReactionCollector(filter, { time: 900000 });
                collector.on('collect', async (r, user) => {
                    if(r.emoji.name === "✨") {
                        message.channel.send(` ✨ Veuillez entrer le titre de l'embed.`).then(mp => {
                            mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var msg = cld.first();
                                m.edit(
                                    embed.setTitle(msg)
                                )
                            })
                        })
                    } else if(r.emoji.name === "🔰") {
                        message.channel.send(` 🔰 Veuillez entrer la description de l'embed.`).then(mp => {
                            mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var msg = cld.first()
                                m.edit(
                                    embed.setDescription(msg)
                                )
                            })
                        })
    
                    } else if(r.emoji.name === "📚") {
                        message.channel.send(` 📚 Veuillez entrer le titre du Field de l'embed.`).then(mp => {
                            mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var title = cld.first()
                                message.channel.send(` 📚 Veuillez entrer la description du Field de l'embed.`)
                                mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var desc = cld.first()
                                m.edit(
                                    embed.addField(title, desc)
                                )                           
                            })
                            })
                        })
    
                    } else if(r.emoji.name === "📸") {
                        message.channel.send(` 📸 Veuillez entrer le lien de l'image de l'embed.`).then(mp => {
                            mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var img = cld.first()
                                m.edit(
                                    embed.setImage(img.content)
                                )                           
                            })
                        })
    
                    } else if(r.emoji.name === "🗺"){
                        message.channel.send(` 🗺 Veuillez entrer le lien du thumbnail de l'embed.`).then(mp => {
                            mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var thumbnail = cld.first()
                                m.edit(
                                    embed.setThumbnail(thumbnail.content)
                                )
                            })
                        })
                    } else if(r.emoji.name === "🌟") {
                        message.channel.send(` 🌟 Veuillez entrer le titre du footer de l'embed.`).then(mp => {
                            mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var title = cld.first()
                                message.channel.send(` 🌟 Veuillez entrer l'image du footer de l'embed taper false pour ne pas en mettre.`)
                                mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var desc = cld.first().content
                                if(desc === 'false') {
                                    m.edit(
                                        embed.setFooter(title)
                                    ) 
                                } else {
                                    m.edit(
                                        embed.setFooter(title, desc.content)
                                    )  
                                }                         
                            })
                            })
                        })
    
                    } else if(r.emoji.name === "🌈") {
                        message.channel.send(` 🌈 Veuillez entrer le code hexadecimal de l'embed.`).then(mp => {
                            mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var color = cld.first()
                                m.edit(
                                    embed.setColor(`${color}`)
                                )
                                
                            })
                        })
    
                    } else if(r.emoji.name === "👤") {
                                m.edit(
                                    embed.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                                )
    
                    } else if(r.emoji.name === "✅") {
                        message.channel.send(` ✅ Veuillez envoyé l'id du channel pour l'embed.`).then(mp => {
                            mp.channel.awaitMessages(dureefiltrer, {max: 1, time: 30000, errors: ['time'] })
                            .then(cld => {
                                var channel = cld.first()
                                var channels = message.guild.channels.cache.get(`${channel}`)
                                if(!channel){
                                    message.channel.send("❌ Merci d'envoyer l'id d'un channel textuel.")
                                } else {
                                    channels.send(embed)
                                }
                            })
                        })
                    }
                    r.users.remove(user)
                })
                
    await ins.react("✨")
    await ins.react("🔰")
    await ins.react("📚")
    await ins.react("📸")
    await ins.react("🗺")
    await ins.react("🌟")
    await ins.react("🌈")
    await ins.react("👤")
    await ins.react("✅")
    
            })
        })
  })
};

module.exports.config = {
  name: "embed",
  aliases: ["em"],
  description: "Mettez un message dans un embed.",
  usage: "",
  commandCategory: "moderation",
  cooldownTime: '5'
};
