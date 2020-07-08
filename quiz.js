/**
* @file Definition file for Quiz object
* @author Ralph L. Rose <rose@waseda.jp>
* @copyright Ralph L. Rose 2020
* @license MIT The MIT License
*/

"use strict";

/**
* This defines the Quiz class which is the main object that EWE works
* on and creates in one run. A structure json should look as follows.
* Any number of parts may be included (two are shown here as example).
* 
* { "parts": [
*      { "type": "ItemType",
*        "number": "Integer" },
*      { "type": "ItemType",
*        "number": "Integer" }
* ]}
*
* @param {json object} structure a json object defining the structure of the quiz
* @param {object[]} itemGroups an array of objects of type ItemGroup
* @param {string} title the title of the quiz
* @param {string} instructions a string intended to contain instructions directed to the quiz taker
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
}

/**
* A class which defines a group of like items, forming one
* part of a complete Quiz.
*/
class ItemGroup {
    _title = null;
    _itemType = null;
    _items = [];

    constructor(itemType) {
        this._itemType = itemType;
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