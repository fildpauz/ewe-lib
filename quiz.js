/* Title: quiz.js
 * Author: Ralph L. Rose
 * E-mail address: rose@waseda.jp
 * Description: Definition file for Quiz object
 * License: The MIT License
 */

"use strict";

class Quiz {
    structure = null;
    itemGroups = [];
    title = ""; // TODO: How to deal with localization of title and instructions?
    instructions = "";

    constructor(structure){
        if(!isWellFormedQuizStructure(structure)) {
            throw new Error('Cannot initialize Quiz object: Structure definition is not well-formed.')
        } else {
            this.structure = structure;
        }
    }

    get structure() {
        return this.structure;
    }

    set title(title) {
        this.title = title;
    }

    set instructions(instructions) {
        this.instructions = instructions;
    }
}

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
    for (type in itemTypes) {
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