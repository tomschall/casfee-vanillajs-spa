'use strict';

function Route(name, template, defaultRoute) {
  try {
    if (!name || !template) {
      throw 'error: name and template params are mandatories';
    }
    this.constructor(name, template, defaultRoute);
  } catch (e) {
    console.error(e);
  }
}

Route.prototype = {
  name: undefined,
  template: undefined,
  default: undefined,
  constructor: function (name, template, defaultRoute) {
    this.name = name;
    this.template = template;
    this.default = defaultRoute;
  },
  isActiveRoute: function (path) {
    return path.replace('#', '') === this.name;
  },
};
