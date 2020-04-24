'use strict';

function Router(routes) {
  try {
    if (!routes) {
      throw 'error: routes param is missing';
    } else if (!Array.isArray(routes) || !this.containsObject(routes)) {
      throw 'error: param needs to be an array of objects';
    }
    this.constructor(routes);
    this.init();
  } catch (e) {
    console.error(e);
  }
}

Router.prototype = {
  routes: undefined,
  rootElem: undefined,
  constructor: function (routes) {
    this.routes = routes;
    this.rootElem = document.getElementById('root');
  },
  init: function () {
    const r = this.routes;
    (function (scope, r) {
      window.addEventListener('hashchange', function (e) {
        scope.detectChange(scope, r);
      });
    })(this, r);
    this.detectChange(this, r);
  },
  detectChange: function (scope, r) {
    if (window.location.hash.length > 0) {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        let cleanUpLocationHash = window.location.hash.split('/');
        if (route.isActiveRoute(cleanUpLocationHash[0].substr(1))) {
          scope.navigateTo(route.component);
        }
      }
    } else {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.default) {
          scope.navigateTo(route.component);
        }
      }
    }
  },
  navigateTo: function (component) {
    (function (scope) {
      import('./components/' + component + '.js').then((Component) => {
        Component.default.render().then((html) => {
          scope.rootElem.innerHTML = html;
        });
      });
    })(this);
  },
  containsObject: function (list) {
    for (let i = 0; i < list.length; i++) {
      if (typeof list[i] === 'object') {
        return true;
      }
    }
    return false;
  },
};
