import {h} from '@cycle/dom';
import Home from '../../dialogue/Home/index';
import Docs from '../../dialogue/Docs/docs';

const routes = {
  '/': Home,
  '/docs': Docs,
  '*': h('h1', 'Page could not be found'),
};

export default routes;
