/* Title: item.js
 * Author: Ralph L. Rose
 * E-mail address: rose@waseda.jp
 * Description: Definition file for Item object
 * License: The MIT License
 */

"use strict";

const itemTypes = {
    MULTICHOICE_CLOZE: "Multiple choice cloze",
    MULTICHOICE_SYNONYM: "Multiple choice synonym",
    // MULTICHOICE_REARRANGE: "Multiple choice rearrange",
    // MATCHING: "Matching",
    FREERESPONSE_CLOZE: "Free response cloze"
}

class Item {
    _type = null;
    _target = null;

    constructor(type) {
        this._type = type;
    }
}

class MultichoiceItem extends Item {
    _options = [];

    constructor(type) {
        super(type);
    }

    get options() {
        return this._options;
    }

    set options(options) {
        this._options = options;
    }
}

class MultichoiceClozeItem extends MultichoiceItem {
    _stem = null;

    constructor(type) {
        super(type);
    }

    get stem() {
        return this._stem;
    }

    set stem(stem) {
        this._stem = stem;
    }
}

class MultichoiceSynonymItem extends MultichoiceItem {
    _stem = null;

    constructor(type) {
        super(type);
    }

    get stem() {
        return this._stem;
    }

    set stem(stem) {
        this._stem = stem;
    }
}

class MultichoiceRearrangeItem extends MultichoiceItem {
    // TODO: Define properties

    constructor(type) {
        super(type);
    }
    // TODO: Define functions
}

class FreeresponseClozeItem extends Item {
    _stems = [];

    constructor(type) {
        super(type);
    }

    get stems() {
        return this._stems;
    }

    set stems(stems) {
        this._stems = stems;
    }
}

class MatchingItem extends Item {
    // TODO: Define properties

    constructor(type) {
        super(type);
    }
    // TODO: Define functions
}