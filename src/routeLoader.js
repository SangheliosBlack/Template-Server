export default async function loadRoutes(app, routes) {

  const authRoutes = await import('./routes/autentificacion.js');
  app.use(routes.auth, authRoutes.default);
  
  const usersRoutes = await import('./routes/users.js');
  app.use(routes.users, usersRoutes.default);

  const smsRoutes = await import('./routes/sms.js');
  app.use(routes.sms, smsRoutes.default);

  const uploadRoutes = await import('./routes/upload.js');
  app.use(routes.upload, uploadRoutes.default);

  const notificacionsRoutes = await import('./routes/notifications.js');
  app.use(routes.notifications, notificacionsRoutes.default);

}
