const buildPath = (apiVersion, routePath) => `${apiVersion}${routePath}`;

const apiVersion = `/api/${process.env.API_VERSION || 'v1'}/${process.env.NODE_ENV}`;

export default {
  auth:          buildPath(apiVersion,'/auth'),
  users:         buildPath(apiVersion,'/user'),
  sms:           buildPath(apiVersion,'/sms'),
  upload:        buildPath(apiVersion,'/upload'),
  notifications: buildPath(apiVersion,'/notifications'),
  hello:        buildPath(apiVersion,'/')
};