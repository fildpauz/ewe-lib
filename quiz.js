/**
* @file Definition file for Quiz object
* @author Ralph L. Rose <rose@waseda.jp>
* @copyright Ralph L. Rose 2020
* @license MIT The MIT License
*/

/** Load the importTypes enum */
const item = require('./item.js');
const ItemGroup = require('./item-group.js');
const chooseLanguage = require('./choose-language.js');
const CountryLanguage = require('country-language');

"use strict";

/** Load the strings file for internationalization */
var i18nStrings = require("./strings.json");

/**
* This defines the Quiz class which is the main object that EWE works
* on and creates in one run. A structure json should look as follows.
* Any number of parts may be included (two are shown here as example).
* 
* { "language": {
*     "meta": "en",
*     "items": "en"
*   },
*   "parts": [
*      { "type": "ItemType",
*        "number": "Integer" },
*      { "type": "ItemType",
*        "number": "Integer" }
* ]}
*
* @param {json object} _structure a json object defining the structure of the quiz
* @param {object[]} _itemGroups an array of objects of type ItemGroup
* @param {string} _title the title of the quiz
* @param {string} _instructions a string intended to contain instructions directed to the quiz taker
*/
class Quiz {
    _structure = null;
    _itemGroups = [];
    _title = ""; // TODO: How to deal with localization of title and instructions?
    _instructions = "";

    /** @constructor */
    constructor(structure) {
        if (! this.isWellFormedQuizStructure(structure)) {
            throw new Error('Cannot initialize Quiz object: Structure definition is not well-formed.')
        } else {
            this._structure = structure;
            this.initializeMetaText();
            this.initializeItemGroups();
        }
    }

    get structure() {
        return this._structure;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }

    set instructions(instructions) {
        this._instructions = instructions;
    }

    initializeMetaText() {
        var lang = chooseLanguage(this._structure.language.meta);
        i18nStrings.strings.find((element, index) => {
            if (element.language === lang){
                this._title = i18nStrings.strings[index].title;
                this._instructions = i18nStrings.strings[index].instructions;
                return true;
            }
        })
    }

    initializeItemGroups() {
        this._structure.parts.forEach(part => {
            /** @question move initialization steps to ItemGroup constructor? */
            var itemGroup = new ItemGroup(part.type,
                this._itemGroups.length + 1,
                part.number,
                this._structure.language.items);
            this._itemGroups.shift(itemGroup);
        });
    }

    /** 
    * A function to evaluate whether a json object is a well-formed
    * expression of the structure of a Quiz.
    * @param {json} structure - A json object that describes the structure of a quiz
    * @return {boolean} If the structure object is well-formed, true. Otherwise, false.
    */
    isWellFormedQuizStructure(structure) {
        var result = false;
        var groups = structure.parts;
        if (typeof structure.language !== 'undefined' &&
            typeof groups !== 'undefined') {
            result =
                this.isWellFormedLanguageStructure(structure.language) &&
                groups.length > 0 &&
                groups.every((element) => {
                    return (this.isWellFormedGroupStructure(element));
                });
        }
        return result;
    }

    isWellFormedLanguageStructure(structure){
        var result = false;
        if (typeof structure.meta !== 'undefined' &&
            typeof structure.items !== 'undefined'){
            result = CountryLanguage.languageCodeExists(structure.meta) &&
                     CountryLanguage.languageCodeExists(structure.items);
        } 
        return result;
    }

    /**
     * This function checks whether an individual group portion of a 
     * structure definition is well-formed or not.
     * @param {json object} structure 
     * @return {boolean} If the structure object is well-formed, true. Otherwise, false.
     */
    isWellFormedGroupStructure(structure) {
        var result = false;
        for (let type in item.itemTypes) { // Q: Use eweGlobals instead?
            if (type === structure.type) {
                if (Number.isInteger(structure.number)) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }
}


module.exports = Quiz;