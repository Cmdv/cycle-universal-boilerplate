import {Rx} from '@cycle/core'
import {h} from '@cycle/dom'
import latestObj from 'rx-combine-latest-obj'
import switchPath from 'switch-path'
import routes from './routes'

function validateValue([zero, one]) {
  if (!zero || zero === one) {
    return ''
  }
  return zero
}

function createRouteValue(DOM, History) {
  return function getRouteValue(location) {
    const {value} = switchPath(location.pathname, routes)
    if (typeof value === 'function') {
      const dialogue = value({DOM, History})
      return dialogue
    }
    return value
  }
}

const enterOptions = {
  time: 1,
  from: {
    css: {
      opacity: 0,
      transform: 'translate3d(30em, 0, 0) rotateZ(100deg) scale(0.1)',
    },
  },
  to: {
    css: {
      opacity: 1,
      transform: 'translate3d(0,0,0) rotateZ(0) scale(1)',
    },
  },
}

const exitOptions = {
  time: 1,
  from: {
    css: {
      position: 'absolute',
      opacity: 1,
      transform: 'translate3d(0, 0, 0) rotateX(0) scale(1)',
    },
  },
  to: {
    opacity: 0,
    transform: 'translate3d(10em, 5em, -1000px) rotateX(90deg) scale(0.1)',
  },
}

const model = ({
  DOM,
  History,
}) => {
  const childView$ = History
    .map(createRouteValue(DOM,History))

  return latestObj({

    routeValue: childView$
      .flatMap(value => {
        if (value.DOM) {
          return value.DOM
        }
        return Rx.Observable.just(value)
      })
      .startWith(null)
      .pairwise(),

    routeTitle: childView$
      .flatMap(value => {
        if (value.title$) {
          return value.title$
        }
        return Rx.Observable.just('Cycle-Starter')
      }),

  }).distinctUntilChanged();
}

const view = state$ => state$.map(({
  routeValue,
}) =>
  h('div',
    [
      h('div', {},
      [routeValue]
      ),
    ]
  )).distinctUntilChanged();

const Content = responses => {
  const state$ = model(responses);
  const view$ = view(state$);
  return {
    DOM: view$,
    title$: state$.pluck('routeTitle'),
  };
};

export default Content;
export {Content};
