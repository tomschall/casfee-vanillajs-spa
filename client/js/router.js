import LoaderService from './services/LoaderService.js';

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
    this.spinner = new LoaderService();
    this.isInit = true;
    this.init();
  }

  static async create(routes) {
    const obj = new Router(routes);
    return obj;
  }

  init() {
    const r = this.routes;

    window.addEventListener('hashchange', (e) => {
      this.detectChange(r);
    });
    this.detectChange(r);
    this.initDesignSwitch();
    this.initNavigation();
    this.initModal();
    this.spinner.hideLoader();
  }

  detectChange(r) {
    if (!window.location.hash.length > 0) {
      const defaultRouteTo = r.filter((r) => r.default === true);
      this.navigateTo(defaultRouteTo[0].component);
      return;
    }
    const locationHash = window.location.hash.split('/');
    const routeTo = r.filter((r) => r.isActiveRoute(locationHash[0].substr(1)));
    if (routeTo.length) {
      this.navigateTo(routeTo[0].component);
      return;
    }

    const routeNotFound = r.filter((r) => r.name === 'notFound');
    this.navigateTo(routeNotFound[0].component);
  }

  navigateTo(component, filterBy = 'id') {
    component.render(filterBy).then((html) => {
      this.render(component, html);
    });
  }

  async render(component, html) {
    let arr = this.findComponentTags(html);
    if (arr.length) {
      await this.renderMultipleComponents(component, html, arr);
      return;
    }
    this.renderSingleComponent(component, html);
  }

  renderSingleComponent(component, html) {
    console.log('render single');
    this.rootElem.innerHTML = html;
    component.after_render();
    this.initEventListeners();
  }

  async renderMultipleComponents(component, html, arr) {
    console.log('render multi');
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
          this.initEventListeners();
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
      filterFinishDate: 'finishDate',
      filterCreateDate: 'createDate',
      filterImportance: 'importance',
      filterFinished: 'finished',
      filterReset: 'id',
    };

    for (let [key, value] of Object.entries(map)) {
      if (document.getElementById(key) !== null) {
        document
          .getElementById(key)
          .addEventListener('click', async (event) => {
            event.preventDefault();
            window.location.replace('/#list');
            this.navigateTo(this.routes[0].component, value);
          });
      }
    }

    if (document.getElementById('notes') !== null) {
      document
        .getElementById('notes')
        .addEventListener('click', async (event) => {
          if (event.target.dataset.finished !== undefined) {
            const [note] = this.routes[0].component.dataService.notes.filter(
              (el) => {
                return el.id === event.target.dataset.finished;
              },
            );
            note.finished = note.finished === true ? false : true;
            await this.routes[0].component.dataService.updateNote(
              event.target.dataset.finished,
              note,
            );
            this.navigateTo(this.routes[0].component);
          }

          if (event.target.dataset.importance !== undefined) {
            const data = event.target.dataset.importance.split(',');
            const [note] = this.routes[0].component.dataService.notes.filter(
              (el) => {
                return el.id === data[0];
              },
            );
            note.importance = data[1];

            await this.routes[0].component.dataService.updateNote(
              data[0],
              note,
            );

            this.navigateTo(this.routes[0].component);
          }

          if (event.target.dataset.delete !== undefined) {
            await this.routes[0].component.dataService.deleteNote(
              event.target.dataset.delete,
            );

            this.navigateTo(this.routes[0].component);
          }

          if (event.target.dataset.edit !== undefined) {
            const routeEdit = this.routes.filter((r) => r.name === 'edit');
            const modal = document.getElementById('notesModal');
            const form = document.getElementById('modalForm');
            modal.style.display = 'block';
            if (routeEdit) {
              form.innerHTML = await routeEdit[0].component.render(
                event.target.dataset.edit,
              );
              await routeEdit[0].component.after_render();
              this.initEventListeners();
            }
          }

          if (event.target.dataset.detail !== undefined) {
            const routeDetail = this.routes.filter((r) => r.name === 'detail');
            const modal = document.getElementById('notesModal');
            const form = document.getElementById('modalForm');
            modal.style.display = 'block';
            if (routeDetail) {
              form.innerHTML = await routeDetail[0].component.render(
                event.target.dataset.detail,
              );
              await routeDetail[0].component.after_render();
              this.initEventListeners();
            }
          }
        });
    }
    if (document.getElementById('cancel_btn') !== null) {
      document
        .getElementById('cancel_btn')
        .addEventListener('click', async (event) => {
          event.preventDefault();
          const modal = document.getElementById('notesModal');
          if (
            modal !== null &&
            modal.style.display &&
            modal.style.display === 'block'
          ) {
            const form = document.getElementById('modalForm');
            modal.style.display = 'none';
            form.innerHTML = '';
            this.navigateTo(this.routes[0].component);
          } else {
            window.location.replace('/#list');
          }
        });
    }

    this.initDragAndDrop();
  }

  initNavigation() {
    if (!this.isInit) return;
    const burger = document.querySelector('.burger i');
    const nav = document.querySelector('.nav');

    const toggleNav = () => {
      burger.classList.toggle('fa-times');
      burger.classList.toggle('fa-bars');
      nav.classList.toggle('nav-active');
    };

    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleNav();
    });

    nav.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleNav();
    });

    window.onhashchange = (e) => {
      e.stopPropagation();
      burger.classList.contains('fa-times') ? toggleNav() : '';
    };
  }

  initModal() {
    if (!this.isInit) return;

    this.isInit = false;
    const modal = document.getElementById('notesModal');
    const btn = document.getElementById('newForm');
    const form = document.getElementById('modalForm');
    const span = document.getElementsByClassName('close')[0];

    const route = this.routes.filter((r) => r.name === 'new');

    route[0].component.dataService.form$.subscribe((data) => {
      if (data) {
        this.navigateTo(this.routes[0].component);
      }
    });

    btn.onclick = async () => {
      modal.style.display = 'block';
      if (route) {
        form.innerHTML = await route[0].component.render();
        await route[0].component.after_render();
        this.initEventListeners();
      }
    };

    span.onclick = async () => {
      modal.style.display = 'none';
      form.innerHTML = '';
      this.navigateTo(this.routes[0].component);
    };

    window.onclick = async (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
        form.innerHTML = '';
        this.navigateTo(this.routes[0].component);
      }
    };
  }

  initDragAndDrop() {
    const dz = ['dz1', 'dz2'];
    dz.forEach((el) => {
      this.removeDropzone(el);
      this.addDropzone(el);
    });

    const draggable = document.getElementsByClassName('draggable'),
      dropzones = document.getElementsByClassName('dropzone');

    for (let i = 0; i < draggable.length; i++) {
      draggable[i].addEventListener('dragstart', function (event) {
        for (let a = 0; a < dropzones.length; a++) {
          dropzones[a].classList.add('active');
        }
        event.dataTransfer.setData('text/plain', event.target.id);
      });

      draggable[i].addEventListener('dragend', function (event) {
        for (let a = 0; a < dropzones.length; a++) {
          dropzones[a].classList.remove('active');
          dropzones[a].classList.remove('over');
        }
      });

      draggable[i].addEventListener('drag', function () {});
    }

    for (let i = 0; i < dropzones.length; i++) {
      dropzones[i].addEventListener('dragenter', function () {
        dropzones[i].classList.add('over');
      });

      dropzones[i].addEventListener('dragleave', function () {
        dropzones[i].classList.remove('over');
      });

      dropzones[i].addEventListener('dragover', function (evt) {
        evt.preventDefault();
      });

      dropzones[i].addEventListener('drop', async (evt) => {
        evt.preventDefault();

        const id = event.dataTransfer.getData('text');

        for (let i = 0; i < draggable.length; i++) {
          if (draggable[i].getAttribute('id') === id) {
            draggable[i].style.opacity = 0;

            await this.routes[0].component.dataService.deleteNote(id);
            return;
          }
        }
      });
    }
  }

  initDesignSwitch() {
    if (!this.isInit) return;
    if (document.getElementById('switch') !== null) {
      document
        .getElementById('switch')
        .addEventListener('click', async (event) => {
          const body = document.getElementsByTagName('body')[0];
          if (body.classList.contains('theme_dark')) {
            body.classList.remove('theme_dark');
            event.target.outerHTML = '<i class="fas fa-toggle-off fa-2x"></i>';
          } else {
            body.classList.add('theme_dark');
            event.target.outerHTML = '<i class="fas fa-toggle-on fa-2x"></i>';
          }
        });
    }
  }

  removeDropzone(elementId) {
    // Removes an element from the document
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }

  addDropzone(dz) {
    const position = dz === 'dz1' ? 'before' : 'after';
    const element = document.getElementById('container');
    const drzElement = document.createElement('div');
    drzElement.id = dz;
    drzElement.classList.add('dropzone');
    element[position](drzElement);
  }
}

export default Router;
