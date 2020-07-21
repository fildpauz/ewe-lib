const assert = require('assert');
const Quiz = require('../quiz.js');
// import isWellFormedQuizStructure from './quiz';

var validStruc = {
    "language": {
        "meta": "en",
        "items": "en"
    },
    "parts": [
    { "type": "MULTICHOICE_CLOZE",
      "number": 12 },
    { "type": "MULTICHOICE_SYNONYM",
      "number": 8 }
    ]
};

var invalidStruc1 = {
  "langauge": {
      "meta": "en",
      "items": "en"
  },
  "parts": [
  { "type": "MULTICHOICE_CLOZE",
    "number": 12 },
  { "type": "MULTICHOICE_SYNONYM",
    "number": 8 }
  ]
};

var invalidStruc2 = {
  "language": {
      "meta": "en",
      "items": "en"
  }
};

var invalidStruc3= {
  "language": {
      "meta": "en",
      "items": "en"
  },
  "parts": []
};

var invalidStruc4 = {
  "language": {
      "meta": "en",
      "items": "en"
  },
  "parts": [
  { "typ": "MULTICHOICE_CLOZE",
    "numbr": 12 },
  { "type": "MULTICHOICE_SYNONYM",
    "number": 8 }
  ]
};

var invalidStruc5 = {
  "language": {
      "meta": "en",
      "items": "en"
  },
  "parts": [
  { "type": "Multiple choice cloze",
    "number": 12 },
  { "type": "Multiple choice synonym",
    "number": 8 }
  ]
};

var invalidStruc6 = {
  "language": {
      "meta": "en",
      "items": "en"
  },
  "parts": [
  { "type": "MULTICHOICE_CLOZE",
    "number": "twelve" },
  { "type": "MULTICHOICE_SYNONYM",
    "number": 8 }
  ]
};

const quiz = new Quiz(validStruc);

describe("Quiz.isWellFormedQuizStructure()", function() {
  it("Given a valid quiz structure, returns true", function() {
    assert.equal(quiz.isWellFormedQuizStructure(validStruc), true);
  });
  it("Given an invalid quiz structure (no 'language' node), returns false", function() {
    assert.equal(quiz.isWellFormedQuizStructure(invalidStruc1), false);
  });
  it("Given an invalid quiz structure (no 'parts' array), returns false", function() {
    assert.equal(quiz.isWellFormedQuizStructure(invalidStruc2), false);
  });
  it("Given an invalid quiz structure (empty 'parts' array), returns false", function() {
    assert.equal(quiz.isWellFormedQuizStructure(invalidStruc3), false);
  });
  it("Given an invalid quiz structure (one malformed part with wrong labels), returns false", function() {
    assert.equal(quiz.isWellFormedQuizStructure(invalidStruc4), false);
  });
  it("Given an invalid quiz structure (one malformed part with wrong values), returns false", function() {
    assert.equal(quiz.isWellFormedQuizStructure(invalidStruc5), false);
  });
  it("Given an invalid quiz structure (one malformed part with number value as string), returns false", function() {
    assert.equal(quiz.isWellFormedQuizStructure(invalidStruc6), false);
  });
});
describe("Quiz.isWellFormedGroupStructure()", function() {
  it("Given a valid group structure, returns true", function() {
    assert.equal(quiz.isWellFormedGroupStructure(validStruc.parts[0]), true);
  });
});

