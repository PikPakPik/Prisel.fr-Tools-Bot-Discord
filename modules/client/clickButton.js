const { MessageEmbed } = require('discord.js')
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = async (bot, button) => {
  let dureefiltrer = response => { return response.button.clicker.user.id === button.clicker.user.id};
  if(button.id === "changestat") {
    button.message.channel.messages.fetch(button.message.id).then(async msg => {
      const embed = new MessageEmbed(msg.embeds[0])
      embed.description = "Veuillez dès à présent choisir le type de statut."
      let stream = new MessageButton()
      .setStyle('blurple')
      .setEmoji('559034815370887170')
      .setLabel('Streaming') 
      .setID('streamstat')
      let play = new MessageButton()
      .setStyle('gray')
      .setEmoji('866444552659402752')
      .setLabel('Jouer') 
      .setID('playstat')
      let listen = new MessageButton()
      .setStyle('red')
      .setEmoji('866444552659402752')
      .setLabel('Écouter') 
      .setID('listenstat')
      let participations = new MessageButton()
      .setStyle('green')
      .setEmoji('866444552659402752')
      .setLabel('Participer') 
      .setID('participationstat')
      let watch = new MessageButton()
      .setStyle('blurple')
      .setEmoji('866444552659402752')
      .setLabel('Regarder') 
      .setID('watchstat')


      let banyesno = new MessageActionRow()
      .addComponents(stream, play, listen, participations, watch)
      button.message.edit(msg.embeds[0], banyesno)
      await msg.edit(embed)
      return button.reply.send('Veuillez dès à présent choisir le type de statut.', true)
  })
  }

  if(button.id === "streamstat") {
    button.message.channel.messages.fetch(button.message.id).then(async msg => {
      const embed = new MessageEmbed(msg.embeds[0])
      embed.description = "Veuillez ecrire le text du statut."
      let stream = new MessageButton()
      .setStyle('blurple')
      .setEmoji('559034815370887170')
      .setLabel('Streaming') 
      .setID('streamstat')
      let play = new MessageButton()
      .setStyle('gray')
      .setEmoji('866444552659402752')
      .setLabel('Jouer') 
      .setID('playstat')
      let listen = new MessageButton()
      .setStyle('red')
      .setEmoji('866444552659402752')
      .setLabel('Écouter') 
      .setID('listenstat')
      let participations = new MessageButton()
      .setStyle('green')
      .setEmoji('866444552659402752')
      .setLabel('Participer') 
      .setID('participationstat')
      let watch = new MessageButton()
      .setStyle('blurple')
      .setEmoji('866444552659402752')
      .setLabel('Regarder') 
      .setID('watchstat')


      let banyesno = new MessageActionRow()
      .addComponents(stream, play, listen, participations, watch)
      button.message.edit(msg.embeds[0], banyesno)
      await msg.edit(embed)
      return button.reply.send('Veuillez ecrire le texte du statut.', true)
  })
    button.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
      .then(cld => {
      var msg = cld.first();
      var argss = msg.content
      client.user.setActivity(`${argss}`, {type: 'STREAMING', url: 'https://www.twitch.tv/billal_fr'});
      msg.delete()
  });
    }
}