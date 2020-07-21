const assert = require('assert');
const Quiz = require('../quiz.js');
const i18nStrings = require('../strings.json');

var validStruc1 = {
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

var validStruc2 = {
  "language": {
      "meta": "ja",
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

const quiz = new Quiz(validStruc1);

describe("Quiz", function() {
  it("Quiz.structure returns same structure as it was initiated with", function() {
    const quiz1 = new Quiz(validStruc1);
    assert.equal(quiz1.structure, validStruc1);
  });
  it("Quiz.title returns language-specific title (en)", function() {
    const quiz2 = new Quiz(validStruc1);
    assert.equal(quiz2.title, "Vocabulary Quiz"); /** @todo make this point to node in i18nStrings */
  });
  it("Quiz.title returns language-specific title (ja)", function() {
    const quiz3 = new Quiz(validStruc2);
    assert.equal(quiz3.title, "単語クイズ"); /** @todo make this point to node in i18nStrings */
  });
});

describe("Quiz.isWellFormedQuizStructure()", function() {
  it("Given a valid quiz structure, returns true", function() {
    assert.equal(quiz.isWellFormedQuizStructure(validStruc1), true);
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
    assert.equal(quiz.isWellFormedGroupStructure(validStruc1.parts[0]), true);
  });
  it("Given an invalid group structure (malformed part with wrong labels), returns false", function() {
    assert.equal(quiz.isWellFormedGroupStructure(invalidStruc4.parts[0]), false);
  });
  it("Given an invalid group structure (malformed part with wrong values), returns false", function() {
    assert.equal(quiz.isWellFormedGroupStructure(invalidStruc5.parts[0]), false);
  });
  it("Given an invalid group structure (malformed part with number value as string), returns false", function() {
    assert.equal(quiz.isWellFormedGroupStructure(invalidStruc6.parts[0]), false);
  });
});

