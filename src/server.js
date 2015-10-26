let {Rx, run} = require('@cycle/core');
let express = require('express');
let {h, makeHTMLDriver} = require('@cycle/dom');
let {makeServerHistoryDriver} = require('cycle-history');
let {Main} = require('dialogue/Main');

function wrapVTreeWithHTMLBoilerplate(vtree) {
  return h('html', [
    h('head', [
      h('title', 'Cycle Starter'),
      h('link', {href: 'dist/styles.css', rel: 'stylesheet'}),
    ]),
    h('body', [
      h('div', {className: 'app'}, [vtree]),
      h('script', {src: 'dist/app.js'}),
    ]),
  ]);
}

function prependHTML5Doctype(html) {
  return '<!doctype html>${html}';
}

function wrapAppResultWithBoilerplate(appFn) {
  return function wrappedAppFn(ext) {
    let requests = appFn(ext);
    let vtree$ = requests.DOM.take(1);
    let wrappedVTree$ = Rx.Observable.combineLatest(vtree$,
      wrapVTreeWithHTMLBoilerplate
    );
    return {
      DOM: wrappedVTree$,
      History: requests.History.take(1),
    };
  };
}

let server = express();
// In production you should allow a web server
// like NGINX handle static files.
server.use('/dist', express.static('dist'));
server.use('/static', express.static('static'));

server.use(function cycleServer(req, res) {
  // Ignore favicon requests
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end();
    return;
  }
  console.log('req: ${req.method} ${req.url}');

  let wrappedAppFn = wrapAppResultWithBoilerplate(Main);

  let [requests, responses] = run(wrappedAppFn, {

    DOM: makeHTMLDriver(),
    History: makeServerHistoryDriver({
      pathname: req.url,
    }),
  });
  let html$ = responses.DOM.map(prependHTML5Doctype);
  html$.subscribe(html => res.send(html));
});

let port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0');
console.log('Listening on port ${port}');
