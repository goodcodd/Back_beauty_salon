import TelegramBot from "node-telegram-bot-api";
import moment from "moment";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

export default {
  telegramReminder: {
    task: async ({ strapi }) => {
      const now = moment.utc();
      const in24Hours = now.clone().add(24, 'hours');

      const startTime = in24Hours.startOf('hour').toISOString();
      const endTime = in24Hours.endOf('hour').toISOString();

      const bookings = await strapi.entityService.findMany('api::booking.booking', {
        fields: ['chat_id', 'datetime', 'is_notified'],
        filters: {
          is_notified: false,
          datetime: {
            $gte: startTime,
            $lte: endTime,
          },
        },
      });

      if (bookings.length > 0) {
        for (const booking of bookings) {
          const { chat_id } = booking;
          const message = `Reminder: Your reservation is scheduled for ${moment(booking.datetime). format('DD.MM.YYYY HH:mm')}. See you soon!`;

          await bot.sendMessage(chat_id, message);
          await strapi.entityService.update('api::booking.booking', booking.id, {
            data: {
              is_notified: true,
            },
          });
        }
      }
    },
    options: {
      rule: "0 * * * *",
    },
  },
};
