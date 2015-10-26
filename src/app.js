const {run} = require('@cycle/core');
const {makeDOMDriver} = require('@cycle/dom');
const {makeHistoryDriver} = require('cycle-history');
const {Main} = require('dialogue/Main');

function clientSideApp(responses) {
  let requests = Main(responses);
  requests.History = requests.History.skip(1);
  return requests;
}

run(clientSideApp, {
  DOM: makeDOMDriver('.app'),
  History: makeHistoryDriver({
    hash: false,
    queries: true,
  }),
});
