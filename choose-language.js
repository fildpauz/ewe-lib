/**
* @file Definition file for function chooseLanguage()
* @author Ralph L. Rose <rose@waseda.jp>
* @copyright Ralph L. Rose 2020
* @license MIT The MIT License
*/

"use strict";

/** Load the strings file for internationalization */
var i18nStrings = require("./strings.json");

module.exports = function chooseLanguage(structureLanguage){
    if (typeof structureLanguage !== 'string'){
        throw new Error("Wrong argument type to chooseLanguage()");
    }
    var testStr = structureLanguage.toLowerCase();
    if (i18nStrings.languages.includes(testStr)){
        return testStr;
    } else {
        return i18nStrings.default;
    }
}
