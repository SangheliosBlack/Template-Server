//const { Ability } = require('@casl/ability');
import defineAbilitiesFor from '../config/caslConfig.js';

const checkPermissions = (action, subject) => (req, res, next) => {
  
  const user = req.user;

  const ability = defineAbilitiesFor(user);

  if (ability.can(action, subject)) {
    next();
  } else {
    res.status(403).json({
      error: 'Acceso denegado',
      action,
      subject,
      rules: ability.rules,
    });
  }
};

export default checkPermissions;
