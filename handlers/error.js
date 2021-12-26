module.exports = {
  disconnect: () => {
      console.warn('Déconnecté !');
  },
  reconnecting: () => {
      console.log("Reconnexion ...");
  },
  warn: (err) => {
      console.warn('[ATTENTION]', err);
  },
  error: (err) => {
      console.error(err.message);
  },
  DiscordAPIError: (err) => {
      console.log('[DiscordAPIError]', err);
  },
  uncaughtException: (err) => {
      console.error(`[uncaughtException] ${err.stack}`);
      process.exit(1);
  },
  unhandledRejection: (err, promise) => {
      console.log('[unhandledRejection]', `Raison: ${err.stack}`);
  },
};