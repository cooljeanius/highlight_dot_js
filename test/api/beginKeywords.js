'use strict';

const hljs = require('../../build');

const grammar = function() {
  return {
    contains: [
      { beginKeywords: "class" }
    ]
  };
};

const grammarWithFollowupRule = function() {
  return {
    contains: [
      { beginKeywords: "class" },
      { begin: "class", className: "found" }
    ]
  };
};

describe('beginKeywords', () => {
  before(() => {
    hljs.registerLanguage("test", grammar);
    hljs.registerLanguage("has-followup", grammarWithFollowupRule);
  });

  it("should allow subsequence matches to still succeed", () => {
    const content = "A.class = self";
    const res = hljs.highlight(content, { language: "has-followup" });
    res.value.should.equal('A.<span class="hljs-found">class</span> = self');
  });

  it("should ignore a preceeding .", () => {
    const content = "A.class = self";
    const res = hljs.highlight(content, { language: "test" });
    res.value.should.equal('A.class = self');
  });

  it("should ignore a trailing .", () => {
    const content = "class.config = true";
    const res = hljs.highlight(content, { language: "test" });
    res.value.should.equal('class.config = true');
  });

  it('should detect keywords', () => {
    const content = "I have a class yes I do.";
    const res = hljs.highlight(content, { language: "test" });
    res.value.should.equal('I have a <span class="hljs-keyword">class</span> yes I do.');
  });
});
