// caslConfig.js
const { AbilityBuilder, Ability } = require('@casl/ability');
const roleConfig = require('./roleConfig');

const defineAbilitiesFor = (user) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user && user.role === roleConfig.ADMIN) {
    can('manage', 'all');
  } else {
    can('read', 'all');
  }

  return new Ability(rules);
};

module.exports = defineAbilitiesFor;
