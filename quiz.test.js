const chooseLanguage = require("./quiz.js");

// import { chooseLanguage } from quiz;

test("Given 'en', returns 'en'", () => {
    expect(chooseLanguage("en")).toBe("en");
});
test("Given 'ja', returns 'ja'", () => {
    expect(chooseLanguage("ja")).toBe("ja");
});
test("Given unknown language designation, returns default 'en'", () => {
    expect(chooseLanguage("xq")).toBe("en");
});
test("Given designation in upper case, returns matching lower case", () => {
    expect(chooseLanguage("JA")).toBe("ja");
});
test("Given non-string, throw error", () => {
    expect(() => {
        chooseLanguage( { "en": "en" } );
    }).toThrow();
});