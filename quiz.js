/**
* @file Definition file for Quiz object
* @author Ralph L. Rose <rose@waseda.jp>
* @copyright Ralph L. Rose 2020
* @license MIT The MIT License
*/

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
*   }
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
    constructor(structure){
        if(!isWellFormedQuizStructure(structure)) {
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

    set title(title) {
        this._title = title;
    }

    set instructions(instructions) {
        this._instructions = instructions;
    }

    initializeMetaText(){
        var lang = chooseLanguage(this._structure.language);
        i18nStrings.strings.find(language === lang, match => {
            this._title = match.title;
            this._instructions = match.instructions;
        })
    }

    initializeItemGroups(){
        this._structure.parts.forEach(part => {
            /** @question move initialization steps to ItemGroup constructor? */
            itemGroup = new ItemGroup(part.type,
                this._itemGroups.length + 1,
                part.number,
                this._structure.language);
            this._itemGroups.shift(itemGroup);
        });
    }
}

function chooseLanguage(structureLanguage){
    if (i18nStrings.languages.includes(structureLanguage)){
        return structureLanguage;
    } else {
        return i18nStrings.default;
    }
}

/**
* A class which defines a group of like items, forming one
* part of a complete Quiz.
* @param {number} _order the user-specified order of this item group in the quiz
* @param {string} _title a string title for this part of the quiz
* @param {string} _instructions a string giving instructions for this part
* @param {ItemType} _itemType the type of the items in this part
* @param {number} _targetCount the user-specified number of items that are to be
* created for this part
* @param {Item[]} _items an array of question items of class Item
*/
class ItemGroup {
    _order = null;
    _title = null;
    _instructions = null;
    _itemType = null;
    _targetCount = null;
    _items = [];

    /** @constructor */
    constructor(itemType, order, targetCount, language) {
        this._itemType = itemType;
        this._order = order;
        this._targetCount = targetCount;
        /** @todo initialize title based on itemType and language */
        var lang = chooseLanguage(this._structure.language);
        i18nStrings.strings.find(language === lang, match => {
            match.types.find(type === this._itemType, match2 => {
                this._title = match2.title;
                this._instructions = match2.instructions;
            })
        })
    }

    get title(title) {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get items() {
        return this._items;
    }

    set items(items) {
        this._items = items;
    }
}

/** 
* A function to evaluate whether a json object is a well-formed
* expression of the structure of a Quiz.
* @param {json} structure - A json object that describes the structure of a quiz
* @return {boolean} If the structure object is well-formed, true. Otherwise, false.
*/
function isWellFormedQuizStructure(structure) {
    var groups = structure.split(",");
    groups.forEach(element => {
        if (!isWellFormedGroupStructure(element)){
            return false;
        }
    });
    return true;
}

/**
 * This function checks whether an individual group portion of a 
 * structure definition is well-formed or not.
 * @param {json object} structure 
 * @return {boolean} If the structure objed is well-formed, true. Otherwise, false.
 */
function isWellFormedGroupStructure(structure){
    var strucInfo = structure.split(":");
    if (strucInfo.length !== 2) {
        return false;
    }
    var result = false;
    for (type in itemTypes) { // Q: Use eweGlobals instead?
        if (type === strucInfo[0]){
            result = true;
            break;
        }
    }
    if (!Number.isInteger(strucInfo[1])) {
        result = false;
    }
    return result;
}