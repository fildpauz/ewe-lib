const assert = require('assert');
const chooseLanguage = require('../choose-language.js');

describe('Choose language', function () {
    it("Given 'en', returns 'en'", function() {
        assert.equal(chooseLanguage("en"), "en");
    });
    it("Given 'ja', returns 'ja'", function() {
        assert.equal(chooseLanguage("ja"), "ja");
    });
    it("Given unknown language designation, returns default 'en'", function() {
        assert.equal(chooseLanguage("xq"), "en");
    });
    it("Given designation in upper case, returns matching lower case", function() {
        assert.equal(chooseLanguage("JA"), "ja");
    });
    it("Given non-string, throw error", function() {
        const expectedError = new Error("Wrong argument type to chooseLanguage()");
        assert.throws(() => {
            chooseLanguage( { "lang": "en" } );
        }, expectedError);
    });
});