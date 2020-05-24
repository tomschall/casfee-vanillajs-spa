import Route from './Route.js';
import Router from './Router.js';

import List from './components/List.js';
import Detail from './components/Detail.js';
import Form from './components/Form.js';
import Edit from './components/Edit.js';
import NotFound from './components/NotFound.js';

import DataService from './services/DataService.js';
import RouterUtils from './utils/RouterUtils.js';

('use strict');

(async function () {
  const dataService = await DataService.create();
  const router = await Router.create([
    new Route('list', await List.create(dataService), true),
    new Route('detail', await Detail.create(dataService)),
    new Route('new', await Form.create(dataService)),
    new Route('edit', await Edit.create(dataService)),
    new Route('notFound', NotFound),
  ]);
})();
