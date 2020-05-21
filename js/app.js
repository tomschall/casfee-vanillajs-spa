import Route from './Route.js';
import Router from './Router.js';

import List from './components/List.js';
import Detail from './components/Detail.js';
import Form from './components/Form.js';
import Edit from './components/Edit.js';
import NotFound from './components/NotFound.js';

('use strict');

(async function () {
  const router = new Router([
    new Route('list', await List.create(), true),
    new Route('detail', Detail),
    new Route('new', Form),
    new Route('edit', Edit),
    new Route('notFound', NotFound),
  ]);
})();
