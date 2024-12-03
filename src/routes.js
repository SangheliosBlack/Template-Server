const buildPath = (apiVersion, routePath) => `${apiVersion}${routePath}`;

const apiVersion = `/api/${process.env.API_VERSION || 'v1'}/${process.env.NODE_ENV}`;

export default {
  auth:  buildPath(apiVersion,'/auth'),
  users: buildPath(apiVersion,'/users'),
  sms:   buildPath(apiVersion,'/sms')
};