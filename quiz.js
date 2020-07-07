/**
* @file Definition file for Quiz object
* @author Ralph L. Rose <rose@waseda.jp>
* @copyright Ralph L. Rose 2020
* @license The MIT License
*/

"use strict";

/**
* This defines the Quiz class which is the main object
* that EWE works on and creates in one run.
*/
class Quiz {
    _structure = null;
    _itemGroups = [];
    _title = ""; // TODO: How to deal with localization of title and instructions?
    _instructions = "";

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