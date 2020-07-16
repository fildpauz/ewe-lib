/**
 * @file Main module for building a vocabulary quiz
 * @author Ralph L. Rose <rose@waseda.jp>
 * @copyright Ralph L. Rose 2020
 * @license MIT The MIT License
 */

"use strict";

/**
 * This is the main class for generating a vocabulary quiz.
 * 
 * @param {json object} _structure a json object (re)setting the following
 * parameters
 * @param {number} _targetContextFreqThreshold the minimum frequency value
 * (absolute value in specified frequency list) for the trigram context of the
 * target word in a candidate stem.
 * @param {number} _distractorContextFreqThreshold the maximum frequency value
 * (absolute value in specified frequency list) for the trigram context of a
 * candidate distractor word when substituted in for the target in the target
 * trigram context.
 * @param {number} _numOptions the number of options (including the target) when
 * generating multiple choice items.
 * @param {outputFormats} _outputFormat the desired format that the quiz should
 * be output as after completion.
 * @param {string} _frequencyList the list to be used to when retrieving trigram
 * frequencies.
 * @param {string} _stemSourceCorpus the corpus from which to draw stem 
 * sentences.
 * @param {string} _language the intended language of the test words, candidate
 * stems, and definitions.
 * @param {boolean} _uniqueTargets whether or not ewe-lib should avoid creating
 * multiple items with the same target word.
 * @param {string} _readabilityIndex the readability algorithm to use when
 * estimating the difficulty level of candidate stem sentences.
 * @param {number} _readabilityLimit the maximum level (value) that a candidate
 * stem may have.
 */
class quizFactory {
    // Key parameters
    _targetContextFreqThreshold = 100;
    _distractorContextFreqThreshold = 40;
    _numOptions = 4;
    _outputFormat = outputFormats.TEXT;
    _frequencyList = "PhraseFinder"; /** @todo create Frequency List module */
    _stemSourceCorpus = "Wikipedia"; /** @question should this specify which Wiki? (English, Simple English) */
    _language = "en"; /** @question should this be "en-us"? */
    _uniqueTargets = false;
    _readabilityIndex = "Linsear Write"; /** @todo create readability module */
    _readabilityLimit = 12;
    _theQuiz = null;

    /** @constructor */
    constructor(settings) {
        this._targetContextFreqThreshold = checkSetting(settings.targetContextFreqThreshold, 100);
        this._distractorContextFreqThreshold = checkSetting(settings.distractorContextFreqThreshold, 40);
        this._numOptions = checkSetting(settings.numOptions, 4);
        this._outputFormat = checkSetting(settings.outputFormat, outputFormats.TEXT);
        this._frequencyList = checkSetting(settings.frequencyList, "PhraseFinder");
        this._stemSourceCorpus = checkSetting(settings.stemSourceCorpus, "Wikipedia");
        this._language = checkSetting(settings.language, "en");
        this._uniqueTargets = checkSetting(settings.uniqueTargets, false);
        this._readabilityIndex = checkSetting(settings.readabilityIndex, "Linsear Write");
        this._readabilityLimit = checkSetting(settings.readabilityLimit, 12);
    }

    makeQuiz(structure){
        this._theQuiz = new quiz(structure);
        theQuiz._itemGroups.forEach(itemGroup => {
            makeItemGroup(itemGroup);
        });
    }

    makeItemGroup(itemGroup){
        for (i=0; i<itemGroup._targetCount; i++){
            makeItem(itemGroup._itemType, item =>{
                itemGroup._items.push(item);
            })
        }
    }
}

function makeItem(itemType, callback){
    var item;
    switch (itemType) {
        case itemTypes.MULTICHOICE_CLOZE:
            item = makeMultichoiceClozeItem();
            break;
        case itemTypes.MULTICHOICE_SYNONYM:
            item = makeMultichoiceSynonymItem();
            break;
        case itemTypes.FREERESPONSE_CLOZE:
            item = makeFreeResponseClozeItem();
            break;
        case itemTypes.MULTICHOICE_REARRANGE:
            item = makeMultichoiceRearrangeItem();
            break;
        case itemTypes.MATCHING:
            item = makeMatchingItem();
            break;
        default:
            throw "Unknown or undefined ItemType";
    }
    return item;
}

/**
 * Main function for producing a multiple choice cloze item
 */
function makeMultichoiceClozeItem(){
    var item = new MultichoiceClozeItem();
    /** @todo do lots of stuff here! */
    return item;
}

/**
 * Main function for producing a multiple choice synonym item
 */
function makeMultichoiceSynonymItem(){
    var item = new MultichoiceSynonymItem();
    /** @todo do lots of stuff here! */
    return item;
}

/**
 * Main function for producing a free response cloze item
 */
function makeFreeResponseClozeItem(){
    var item = new FreeResponseClozeItem();
    /** @todo do lots of stuff here! */
    return item;
}

/**
 * Main function for producing a multiple choice rearrange item
 */
function makeMultichoiceRearrangeItem(){
    var item = new MultichoiceRearrangeItem();
    /** @todo do lots of stuff here! */
    return item;
}

/**
 * Main function for producing a matching item
 */
function makeMatchingItem(){
    var item = new MatchingItem();
    /** @todo do lots of stuff here! */
    return item;
}

/**
 * Checks a quizFactory setting to make sure it is not undefined
 * @param {*} setting a setting for the quizFactory class
 * @param {*} defaultValue a default value for the provided setting
 * @returns {*} if the setting is not undefined, the setting itself is returned;
 * otherwise, defaultValue.
 */
function checkSetting(setting, defaultValue){
    return typeof (setting === 'undefined') ?
        defaultValue : setting;
}