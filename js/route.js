'use strict';

function Route(name, component, defaultRoute) {
  try {
    if (!name || !component) {
      throw 'error: name and component params are mandatories';
    }
    this.constructor(name, component, defaultRoute);
  } catch (e) {
    console.error(e);
  }
}

Route.prototype = {
  name: undefined,
  component: undefined,
  default: undefined,
  constructor: function (name, component, defaultRoute) {
    this.name = name;
    this.component = component;
    this.default = defaultRoute;
  },
  isActiveRoute: function (path) {
    return path.replace('#', '') === this.name;
  },
};
