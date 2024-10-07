module.exports = function(hljs) {
  const BODY = {
    className: 'body', endsWithParent: true
  };
  const LIST = {
    className: 'list',
    variants: [
      { begin: /\(/, end: /\)/ },
      { begin: /\[/, end: /\]/ }
    ],
    contains: [BODY]
  };
  BODY.contains = [LIST];
  return {
    disableAutodetect: true,
    contains: [LIST]
  };
};
