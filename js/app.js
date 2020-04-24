'use strict';

(function () {
  const router = new Router([
    new Route('home', 'home.html', true),
    new Route('detail', 'detail.html'),
  ]);
  console.log('router', router);
})();
