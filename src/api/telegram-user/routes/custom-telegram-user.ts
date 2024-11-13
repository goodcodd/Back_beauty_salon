export default {
  routes: [
    {
      method: 'GET',
      path: '/telegram-users/telegramId/:telegramId',
      handler: 'telegram-user.findByTelegramId',
      config: {
        auth: false,
      },
    },
  ],
};
