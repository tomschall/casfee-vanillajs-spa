class Route {
  constructor(name, component, defaultRoute) {
    try {
      if (!name || !component) {
        throw 'error: name and component params are mandatories';
      }
    } catch (e) {
      console.error(e);
    }
    this.name = name;
    this.component = component;
    this.default = defaultRoute;
  }

  isActiveRoute(path) {
    return path.replace('#', '') === this.name;
  }
}
