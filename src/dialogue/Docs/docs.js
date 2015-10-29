import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';
import latestObj from 'rx-combine-latest-obj';
const {
  div,
  h1
} = require('hyperscript-helpers')(h);
import {dot} from 'utils';

const intent = ({ DOM }) => ({
  // DOM: Object
  scroll$: DOM.select(dot('docs')).events('scroll'),
});

const model = ({
  scroll$,
}) => latestObj({
  scrollPosition: scroll$
    .map(e => e.target.scrollTop)
    .startWith(0),

}).distinctUntilChanged();

const view = (state$: Rx.Observable) => state$.map(({
  scrollPosition, //eslint-disable-line
}) =>
  div(dot('docs'), [
    h1( ['You are at the docs now!'])
  ])
).distinctUntilChanged();

const Docs = (responses: Object) => {
  const actions: Object = intent(responses);
  const state$: Rx.Observable = model(actions);
  const view$: Rx.Observable = view(state$);
  return {
    title$: Rx.Observable.just('Docs'),
    DOM: view$,
  };
};

export default Docs;
export {Docs};
