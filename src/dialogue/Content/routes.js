import {h} from '@cycle/dom'
import Home from '../../dialogue/Home/index';

const routes = {
  '/': Home,
  '/docs': h('h1', {}, 'Docs'),
  '*': h('h1', 'Page could not be found'),
};

export default routes;
