'use strict';

const Worker   = require('tiny-worker');

const { defaultCase, findLibrary } = require('./test_case')

describe('web worker', function() {
  before(async function() {
    this.hljsPath = await findLibrary();
    this.worker = new Worker(function() {
      const authorizedScripts = [
        'https://example.com/authorized-script1.js',
        'https://example.com/authorized-script2.js'
      ];
      self.onmessage = function(event) {
        if (event.data.action === 'importScript') {
          if (authorizedScripts.includes(event.data.script)) {
            importScripts(event.data.script);
            postMessage(1);
          } else {
            postMessage('Unauthorized script');
          }
        } else {
          var result = hljs.highlight(event.data, { language: 'javascript' });
          postMessage(result.value);
        }
      };
    });

    const done = new Promise(resolve => this.worker.onmessage = resolve);
    this.worker.postMessage({
      action: 'importScript',
      script: this.hljsPath
    });
    return done;
  });

  it('should highlight text', function(done) {
    this.worker.onmessage = event => {
      const actual = event.data;

      // the &quot; will be encoded since it's not being
      // filtered by the browsers innerHTML implementation
      const expect = '<span class="hljs-keyword">' +
        'var</span> say = <span class="hljs-string">' +
        '&quot;Hello&quot;</span>;';
      actual.should.equal(expect);

      done();
    };

    this.worker.postMessage(defaultCase.code);
  });

  after(function() {
    this.worker.terminate();
  });
});
