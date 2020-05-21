import List from './components/List.js';
import NotFound from './components/NotFound.js';

class Router {
  constructor(routes) {
    try {
      if (!routes) {
        throw 'error: routes param is missing';
      } else if (!Array.isArray(routes) || !this.containsObject(routes)) {
        throw 'error: param needs to be an array of objects';
      }
    } catch (e) {
      console.error(e);
    }
    this.routes = routes;
    this.rootElem = document.getElementById('root');
    this.init();
  }

  init() {
    const r = this.routes;
    const scope = this;
    window.addEventListener('hashchange', function (e) {
      scope.detectChange(scope, r);
    });

    this.initEventListeners();
    this.detectChange(this, r);
  }

  detectChange(scope, r) {
    if (window.location.hash.length > 0) {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        let cleanUpLocationHash = window.location.hash.split('/');
        if (route.isActiveRoute(cleanUpLocationHash[0].substr(1))) {
          scope.navigateTo(route.component);
          return;
        }
      }
      scope.navigateTo(NotFound);
    } else {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.default) {
          scope.navigateTo(route.component);
        }
      }
    }
  }

  navigateTo(component, filterBy) {
    (function (scope) {
      component.render(filterBy).then((html) => {
        scope.rootElem.innerHTML = html;
        component.after_render();
      });
    })(this);
  }

  initEventListeners() {
    const map = {
      finish_date: 'finishDate',
      create_date: 'createDate',
      importance: 'importance',
      finished: 'finished',
    };

    for (let [key, value] of Object.entries(map)) {
      document.getElementById(key).addEventListener('click', async (event) => {
        event.preventDefault();
        this.navigateTo(this.routes[0].component, value);
      });
    }
  }

  containsObject(list) {
    for (let i = 0; i < list.length; i++) {
      if (typeof list[i] === 'object') {
        return true;
      }
    }
    return false;
  }
}

export default Router;
