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
    this.isInit = true;
    this.init();
  }

  static async create(routes) {
    const obj = new Router(routes);
    return obj;
  }

  init() {
    const r = this.routes;
    const scope = this;
    window.addEventListener('hashchange', function (e) {
      scope.detectChange(r);
    });

    this.initEventListeners();
    this.detectChange(r);
  }

  detectChange(r) {
    if (!window.location.hash.length > 0) {
      const defaultRouteTo = r.filter((r) => r.default === true);
      this.initDataAndNavigate(defaultRouteTo[0]);
      return;
    }
    const locationHash = window.location.hash.split('/');
    const routeTo = r.filter((r) => r.isActiveRoute(locationHash[0].substr(1)));
    if (routeTo.length) {
      this.initDataAndNavigate(routeTo[0]);
      return;
    }

    const routeNotFound = r.filter((r) => r.name === 'notFound');
    this.initDataAndNavigate(routeNotFound[0]);
  }

  initDataAndNavigate(route) {
    this.initDataStream(route.component);
    this.navigateTo(route.component);
  }

  initDataStream(component) {
    if (!this.isInit) return;
    component.dataService.sendData(component.dataService.notes);
    this.isInit = false;
  }

  navigateTo(component, filterBy) {
    component.render(filterBy).then((html) => {
      this.render(component, html);
    });
  }

  render(component, html) {
    let arr = this.findComponentTags(html);
    if (arr.length) {
      this.renderMultipleComponents(component, html, arr);
    }
    this.renderSingleComponent(component, html);
  }

  renderSingleComponent(component, html) {
    this.rootElem.innerHTML = html;
    component.after_render();
  }

  renderMultipleComponents(component, html, arr) {
    let compArr = this.fetchComponentClasses(arr);
    compArr.forEach((comp, i) => {
      comp.render().then((compHtml) => {
        html = this.findAndReplace(arr[i], html, compHtml);
        if (i == compArr.length - 1) {
          this.rootElem.innerHTML = html;
          component.after_render();
          compArr.forEach((c) => {
            c.after_render();
          });
          return;
        }
      });
    });
  }

  findComponentTags(html) {
    let arr = [];
    this.routes.forEach((e) => {
      let match = html.match(new RegExp('<s*' + e.name + '*>'));
      if (match) arr.push(match[0]);
    });
    return arr.map((e) => e.substr(1, e.length - 2));
  }

  fetchComponentClasses(arr) {
    let compArr = [];
    arr.forEach((e) => {
      this.routes.forEach((r) => {
        if (r.name == e) compArr.push(r.component);
      });
    });
    return compArr;
  }

  findAndReplace(comp, html, compHtml) {
    const newStr = html.replace(
      new RegExp('<s*' + comp + '*></s*' + comp + '*>', 'g'),
      `<${comp}>${compHtml}</${comp}>`,
    );
    return newStr;
  }

  containsObject(list) {
    for (let i = 0; i < list.length; i++) {
      if (typeof list[i] === 'object') {
        return true;
      }
    }
    return false;
  }

  initEventListeners() {
    const map = {
      filter_finish_date: 'finishDate',
      filter_create_date: 'createDate',
      filter_importance: 'importance',
      filter_finished: 'finished',
      filter_reset: 'id',
    };

    for (let [key, value] of Object.entries(map)) {
      document.getElementById(key).addEventListener('click', async (event) => {
        event.preventDefault();
        window.location.replace('/#list');
        this.navigateTo(this.routes[0].component, value);
      });
    }
  }
}

export default Router;
