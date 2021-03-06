const { Util: djsUtil } = require('discord.js');
const keepAlive = require('../server.js');


async function init() {
   // Requires
   const Constants = require('./lib/Constants');
   const Webhook = require('./lib/Webhook');
   const Logger = require('./lib/Logger');
   const modes = require('./modes/index');
   const Util = require('./lib/Util');
   const chalk = require('chalk');
   const phin = require('phin');

   // Call dotenv to recognize env vars
   require('dotenv').config({ path: '.env' });

   console.log(`
${chalk.hex('#FC964B')(`                                             ╓╖,`)}
${chalk.hex('#7E8CAE')(`               g/░░░░░░░░░░░░░░░░░░░░░░░░░`)}${chalk.hex('#FC964B')(`╬╣╣╣╢╬N╖`)}
${chalk.hex('#7E8CAE')(`              ▐░░░░░░░░░░░░░░░░░░░░░░░░░░`)}${chalk.hex('#FC964B')(`╣╣╣╣╣╣╣╣╣╢╣╣@,`)}
${chalk.hex('#7E8CAE')(`               ▀░░░░░░░░░░░░░░░░░░░░░░░░░`)}${chalk.hex('#FC964B')(`╣╣╣╣╣╣╣╢╢╣╣╣╣╣@,`)}
${chalk.hex('#7E8CAE')(`                        ╙░░░░░░░░░░░░░░░`)}${chalk.hex('#FC964B')(`╣╣╣╣╣╣╢╣╣╣╣╣╣╣╣╣╣W`)}
${chalk.hex('#7E8CAE')(`                        g░░░░░░░░░░░`)}${chalk.hex('#FC964B')(`╩╨╨╩╬╣╢╣╢╣▒╣╣╣╣╣╣╣╣╣╣╣╣`)}
${chalk.hex('#7E8CAE')(` Æ░░░░⌐   ░░░░░░░░░░░░░░░░░░░░░░⌠`)}${chalk.hex('#B2B2B2')(`▓▓▓▓▓▓▓▓▓`)}${chalk.hex('#FC964B')(`╙╨╣╣╣╣╣╣╣╣╣╣╣╣╣╣╣`)}
${chalk.hex('#7E8CAE')(` ╙░░░░    ╙▀░░░░░░░░░░░░░░░░░╩`)}${chalk.hex('#B2B2B2')(`▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`)}${chalk.hex('#FC964B')(`╙╣╣╣╣╣╣╣╣╣╣╣╣╣@`)}
${chalk.hex('#7E8CAE')(`                     ░░░░░░░`)}${chalk.hex('#B2B2B2')(`▓▓▓▓▓╓╢▒▒▒▒▒▒╢▓▓▓▓▓`)}${chalk.hex('#FC964B')(`╙╣╣╣╣╣╣╣╣╣╣╣╣╢`)}
${chalk.hex('#7E8CAE')(`               _____░░░░░░Ñ`)}${chalk.hex('#B2B2B2')(`▓▓▓▓║▒▒▒▒▒▒▒▒▒▒╖▓▓▓▓`)}${chalk.hex('#FC964B')(`║╣╣╣╣╣╣╣╣╣╣╣╣⌐`)}
${chalk.hex('#7E8CAE')(`              ░░░░░░░░░░░░░`)}${chalk.hex('#B2B2B2')(`▓▓▓▓║▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓`)}${chalk.hex('#FC964B')(`╣╣╣╣╣╣╣╣╣╣╣╣⌐`)}
${chalk.hex('#7E8CAE')(`               ╙╙▐░░░░░░░░░@`)}${chalk.hex('#B2B2B2')(`▓▓▓▓╙▒▒▒▒▒▒▒▒▒▒╜▓▓▓▓`)}${chalk.hex('#FC964B')(`║╣╣╣╣╣╣╣╣╣╣╣╣`)}
${chalk.hex('#7E8CAE')(`                  ░░░░░░░░░░`)}${chalk.hex('#B2B2B2')(`▓▓▓▓▓╙▒▒▒▒▒▒▒▒▓▓▓▓▓`)}${chalk.hex('#FC964B')(`╓╣╣╣╣╣╣╣╣╣╣╣╣Ñ`)}
${chalk.hex('#7E8CAE')(`                  ╚░░░░░░░░░░@`)}${chalk.hex('#B2B2B2')(`▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`)}${chalk.hex('#FC964B')(`╢╣╣╣╣╣╣╣╣╣╣`)}
${chalk.hex('#7E8CAE')(`                   ▐░░░░░░░░░░░@µ`)}${chalk.hex('#B2B2B2')(`▓▓▓▓▓▓▓▓▓▓╓@▓▓▓▓▓▓`)}${chalk.hex('#FC964B')(`╙╣╣╣╣╣╣╢`)}
${chalk.hex('#7E8CAE')(`                    ╙░░░░░░░░░░░░░░░@@@@░╢░░`)}${chalk.hex('#B2B2B2')(`▓▓▓▓▓▓▓`)}${chalk.hex('#FC964B')(`╜╨╣╢╣╣╣`)}
${chalk.hex('#7E8CAE')(`                      ▀░░░░░░░░░░░░░░░░░░░░░░░░░░░`)}${chalk.hex('#B2B2B2')(`▓▓▓▓▓▓▓▒`)}
${chalk.hex('#7E8CAE')(`                         ▀░░░░░░░░░░░░░░░░░░░░░░░░░░╜`)}${chalk.hex('#B2B2B2')(`\"▓▒▓\"`)}
${chalk.hex('#7E8CAE')(`                             ░░░░░░░░░░░░░░░░░░▀╩`)}
${chalk.hex('#7E8CAE')(`                               ╙╙   ░░░░  ╙╙`)}`
);

   // Define globals
   global.active = [];
   global.webhook = null;
   global.constants = Constants;
   global.util = Util;
   global.logger = new Logger({ debug: false });
   global.paymentSourceId = null;
   global.webhookPing = process.env.webhookPing;

   // Try to parse settings
   try {
      global.settings = JSON.parse(process.env.settings);
   } catch {
      return logger.critical(constants.invalidConfig);
   }

   // Define settings with defaults
   global.settings = djsUtil.mergeDefault(constants.defaultSettings, settings);

   if (!settings.mode) return logger.critical(constants.noMode);
   if (!Object.keys(modes).includes(settings.mode)) return logger.critical(constants.invalidMode);

   // Init selected mode
   await modes[settings.mode]();

   if (!active.length) return logger.critical(constants.invalidTokens);

   // Counters
   let guildCount = active
      .map((s) => s.guilds.cache.size)
      .reduce((a, b) => a + b, 0);

   // Get payment method
   let res = await phin({
      url: constants.paymentSourceURL,
      method: 'GET',
      parse: 'json',
      headers: {
         'Authorization': settings.tokens.main,
         'User-Agent': constants.userAgent
      }
   });

   if (!res.body || res.body?.length === 0) {
      logger.warn(constants.noPaymentMethod);
   } else if (res.body[0]) {
      global.paymentSourceId = res.body[0].id;
   } else {
      logger.warn(constants.paymentMethodFail(res.body));
   }

   // Init webhook
   if (settings.webhook?.url) {
      const webhookToken = /[^/]*$/.exec(settings.webhook.url)[0];
      const webhookId = settings.webhook.url.replace(/^.*\/(?=[^\/]*\/[^\/]*$)|\/[^\/]*$/g, '');
      global.webhook = new Webhook(webhookId, webhookToken);
   }
   keepAlive();
   return logger.success(constants.ready(active.length, guildCount));
   
}

init();