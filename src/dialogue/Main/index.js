import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';
const {div} = require('hyperscript-helpers')(h);

import Sidebar from '../../dialogue/Sidebar/index';
import Content from '../../dialogue/Content/index';

const view = (sidebar, content) => div( [
  sidebar,
  div([
    content,
  ]),
]);

const Main = responses => {
  const content = Content(responses);
  const sidebar = Sidebar(responses);
  const view$   = Rx.Observable.just(view(sidebar.DOM, content.DOM,));
  return {
    DOM: view$,
    History: sidebar.url$,
  };
};

export {Main};
