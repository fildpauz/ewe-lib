/**
* @file Definition file for ItemGroup class
* @author Ralph L. Rose <rose@waseda.jp>
* @copyright Ralph L. Rose 2020
* @license MIT The MIT License
*/

const chooseLanguage = require('./choose-language');
const i18nStrings = require('./strings.json')

"use strict";

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
        var lang = chooseLanguage(language);
        i18nStrings.strings.find((element, index) => { // find the language set in i18nStrings
            if (element.language === lang){
                i18nStrings.strings[index].types.find((element, index2) => { // then find the itemType
                    if (element.type === this._itemType){
                        this._title = i18nStrings.strings[index2].types.title;
                        this._instructions = i18nStrings.strings[index2].types.instructions;
                        return true;
                    }
                })
                return true;
            }
        })
    }

    get title() {
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

module.exports = ItemGroup;
