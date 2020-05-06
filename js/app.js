'use strict';

(function () {
  const router = new Router([
    new Route('home', 'Home', true),
    new Route('detail', 'Detail'),
    new Route('new', 'Form'),
    new Route('edit', 'Edit'),
  ]);
})();
