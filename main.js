const { Client, Collection } = require('discord.js'),
      colors = require('colors'),
      bot = new Client({
      disableEveryone: true
      }),
      config = require('./conf/config.json'),
      errorHandler = require('./handlers/error'),
      { readdirSync } = require("fs");
      require("discord-buttons")(bot);
      
['commands','aliases', 'usage'].forEach(x => bot[x] = new Collection());
bot.categories = new Set()

bot.on('disconnect', () => errorHandler.disconnect())
    .on("reconnecting", () => errorHandler.reconnecting())
    .on('warn', err => errorHandler.warn(err))
    .on('error', err => errorHandler.error(err))
    .on('DiscordAPIError', err => errorHandler.DiscordAPIError(err));


bot.login(config.token);

console.clear()
console.log(`                                                                                                                     
              ██████╗ ██████╗ ██╗███████╗███████╗██╗         ████████╗ ██████╗  ██████╗ ██╗     ███████╗
              ██╔══██╗██╔══██╗██║██╔════╝██╔════╝██║         ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝
              ██████╔╝██████╔╝██║███████╗█████╗  ██║            ██║   ██║   ██║██║   ██║██║     ███████╗
              ██╔═══╝ ██╔══██╗██║╚════██║██╔══╝  ██║            ██║   ██║   ██║██║   ██║██║     ╚════██║ 
              ██║     ██║  ██║██║███████║███████╗███████╗       ██║   ╚██████╔╝╚██████╔╝███████╗███████║
              ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝       ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
                                  `.green + ` Bienvenue sur la version `.white + `${config.info.version}`.green + ` du ` + `Prisel.fr Tools
                                  `.blue + `\nBot Crée et propulsé par`.blue + ` 𝓐𝓵𝒆𝔁`.red + `                       
                                   ___________________________________________________`.green)

const loadEvents = (dir = "./modules/") => {
  readdirSync(dir).forEach(dirs => {
  const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
                                  
  for (const event of events) {
  const evt = require(`${dir}/${dirs}/${event}`);
  const evtName = event.split(".")[0];
  bot.on(evtName, evt.bind(null, bot));
  console.log(`[EVENTS]`.red + ` Chargement du module >`.white + ` ${evtName}.js`.red);
  };
});
};
loadEvents()

const loadCommands = (dir = "./commandes/") => {
  readdirSync(dir).forEach(dirs => {
  const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
      
  for (const files of commands) {
  const getFileName = require(`${dir}/${dirs}/${files}`);
  bot.commands.set(getFileName.config.name, getFileName);
  bot.categories.add(getFileName.config.commandCategory)
  console.log(`[COMMANDS]`.green + ` Chargement de la commande >`.white + ` ${getFileName.config.name}.js`.green);
  };
});
};
loadCommands()