export default async function loadRoutes(app, routes) {

  const authRoutes = await import('./routes/autentificacion.js');
  app.use(routes.auth, authRoutes.default);
  
  const usersRoutes = await import('./routes/users.js');
  app.use(routes.users, usersRoutes.default);

}
