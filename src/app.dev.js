const {run} = require('@cycle/core');
const {makeDOMDriver} = require('@cycle/dom');
const {makeHistoryDriver} = require('cycle-history');
const {Main} = require('dialogue/Main');

const drivers = {
  DOM: makeDOMDriver('.app'),
  History: makeHistoryDriver({
    hash: false,
    queries: true,
  }),
};

run(Main, drivers);
