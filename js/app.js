'use strict';

(function () {
  const router = new Router([
    new Route('list', 'List', true),
    new Route('detail', 'Detail'),
    new Route('new', 'Form'),
    new Route('edit', 'Edit'),
  ]);
})();
