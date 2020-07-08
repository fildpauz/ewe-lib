/**
 * @file Definition file for Item object
 * @author Ralph L. Rose <rose@waseda.jp>
 * @copyright Ralph L. Rose 2020
 * @license MIT The MIT License
 */

"use strict";

/**
 * This defines several constants to be used to identify item types.
 * @enum types of items
 */
const itemTypes = {
    MULTICHOICE_CLOZE: "Multiple choice cloze",
    MULTICHOICE_SYNONYM: "Multiple choice synonym",
    // MULTICHOICE_REARRANGE: "Multiple choice rearrange",
    // MATCHING: "Matching",
    FREERESPONSE_CLOZE: "Free response cloze"
}

/**
 * This is the item class which is a base class for all question items
 * to be used in quizzes.
 * @param {itemTypes} type the type of this item
 * @param {string} target the word which this item is testing.
 */
class Item {
    _type = null;
    _target = null;

    /** @constructor */
    constructor(type) {
        this._type = type;
    }
}

/**
 * This defines a generic multiple choice question item used as a base
 * class for several other question items
 * @param {string[]} options an array of strings which are answer options
 * @extends Item
 */
class MultichoiceItem extends Item {
    _options = [];

    /** @constructor */
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

/**
 * This defines a multiple choice cloze question item
 * @param {string} stem a string which serves as the stem sentence of the item
 * @extends MultichoiceItem
 */
class MultichoiceClozeItem extends MultichoiceItem {
    _stem = null;

    /** @constructor */
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

/**
 * This defines a multiple choice synonym question item
 * @param {string} stem a string which serves as the stem sentence of the item
 * @extends MultichoiceItem
 */
class MultichoiceSynonymItem extends MultichoiceItem {
    _stem = null;

    /** @constructor */
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

/**
 * Represents a multiple choice rearrange question item
 * @param {type} var
 * @extends MultichoiceItem
 */
class MultichoiceRearrangeItem extends MultichoiceItem {
    /** @todo Define properties */

    /** @constructor */
    constructor(type) {
        super(type);
    }
    /** @todo Define functions */
}

/**
 * Represents a free response cloze question item
 * @param {string[]} stems an array of strings which serve as stem sentences of the item
 * @extends Item
 */
class FreeresponseClozeItem extends Item {
    _stems = [];

    /** @constructor */
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

/**
 * Represents a matching question item
 * @param {type} var
 * @extends Item
 */
class MatchingItem extends Item {
    /** @todo Define properties */

    /** @constructor */
    constructor(type) {
        super(type);
    }
    /** @todo Define functions */
}