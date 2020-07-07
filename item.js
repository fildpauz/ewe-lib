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
    // REARRANGE: "Rearrange",
    // MATCHING: "Matching",
    FREERESPONSE_CLOZE: "Free response cloze"
}

class Item {
    type = null;
    target = null;

    constructor(type) {
        this.type = type;
    }
}