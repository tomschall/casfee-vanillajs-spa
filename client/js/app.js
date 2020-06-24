import Route from './Route.js';
import Router from './Router.js';
import DataService from './services/DataService.js';

import List from './components/List.js';
import Detail from './components/Detail.js';
import Form from './components/Form.js';
import Edit from './components/Edit.js';
import NotFound from './components/NotFound.js';
import LoaderService from './services/LoaderService.js';
import FilterService from './services/FilterService.js';

(async function bootstrap() {
  console.log('init app');
  const spinner = new LoaderService();
  spinner.showLoader();
  const dataService = await DataService.create();
  const filterService = await FilterService.create(dataService);
  await Router.create([
    new Route('list', await List.create(dataService, filterService), true),
    new Route('detail', await Detail.create(dataService)),
    new Route('new', await Form.create(dataService)),
    new Route('edit', await Edit.create(dataService)),
    new Route('notFound', new NotFound()),
  ]);
})();
