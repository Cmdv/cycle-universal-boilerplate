import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';
import latestObj from 'rx-combine-latest-obj';
const {
  div,
} = require('hyperscript-helpers')(h);
import {dot} from 'utils';

const intent = ({ DOM }) => ({
  // DOM: Object
  scroll$: DOM.select(dot('home')).events('scroll'),
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
  div(dot('home'), [
    'Welcome Home',
  ])
).distinctUntilChanged();

const Home = (responses: Object) => {
  const actions: Object = intent(responses);
  const state$: Rx.Observable = model(actions);
  const view$: Rx.Observable = view(state$);
  return {
    title$: Rx.Observable.just('Home'),
    DOM: view$,
  };
};

export default Home;
export {Home};
