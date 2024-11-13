/**
 * telegram-user controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::telegram-user.telegram-user', ({ strapi }) => ({
  async findByTelegramId(ctx) {
    const { telegramId } = ctx.params;

    if (!telegramId) {
      return ctx.badRequest('telegramId parameter is missing');
    }

    try {
      const user = await strapi.entityService.findMany('api::telegram-user.telegram-user', {
        filters: { telegram_id: telegramId },
        limit: 1,
      });

      if (user.length === 0) {
        return ctx.notFound('User not found');
      }

      ctx.body = { data: user[0] };
    } catch (err) {
      ctx.internalServerError('An error occurred while fetching the user');
    }
  },
}));
