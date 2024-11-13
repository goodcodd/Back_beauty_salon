export default {
  routes: [
    {
      method: 'GET',
      path: '/bookings/available',
      handler: 'booking.isMasterAvailable',
      config: {
        auth: false,
      },
    },
  ],
};
