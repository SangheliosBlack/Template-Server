// caslConfig.js
import { AbilityBuilder, Ability } from '@casl/ability';
import { ADMIN } from './roleConfig.js';

const defineAbilitiesFor = (user) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user && user.role === ADMIN) {
    can('manage', 'all');
  } else {
    can('read', 'all');
  }

  return new Ability(rules);
};

export default defineAbilitiesFor;
