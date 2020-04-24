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
    this.rootElem = document.getElementById('app');
  },
  init: function () {
    const r = this.routes;
    (function (scope, r) {
      window.addEventListener('hashchange', function (e) {
        scope.hasChanged(scope, r);
      });
    })(this, r);
    this.hasChanged(this, r);
  },
  hasChanged: function (scope, r) {
    if (window.location.hash.length > 0) {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route.component);
        }
      }
    } else {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.default) {
          scope.goToRoute(route.component);
        }
      }
    }
  },
  goToRoute: function (component) {
    (function (scope) {
      import('./components/' + component + '.js').then((Component) => {
        console.log('name module', Component);
        console.log('name path', './components/' + component + '.js');
        Component.default.render().then(function (html) {
          scope.rootElem.innerHTML = html;
          console.log('promise', html);
        });
      });

      // let url = 'views/' + component,
      //   xhttp = new XMLHttpRequest();
      // xhttp.onreadystatechange = function () {
      //   if (this.readyState === 4 && this.status === 200) {
      //     scope.rootElem.innerHTML = this.responseText;
      //   }
      // };
      // xhttp.open('GET', url, true);
      // xhttp.send();
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
