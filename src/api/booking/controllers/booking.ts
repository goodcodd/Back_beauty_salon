/**
 * booking controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::booking.booking', ({ strapi }) => ({
  async isMasterAvailable(ctx) {
    const { masterId, datetime } = ctx.query;
    
    if (!masterId || !datetime) {
      return ctx.badRequest('Both masterId and datetime query parameters are required');
    }
    
    try {
      const overlappingBookings = await strapi.entityService.findMany('api::booking.booking', {
        filters: {
          master: masterId,
          datetime,
        },
      });
      
      const isAvailable = overlappingBookings.length === 0;
      
      ctx.body = { available: isAvailable };
    } catch (err) {
      ctx.internalServerError('An error occurred while checking availability');
    }
  },
}));
