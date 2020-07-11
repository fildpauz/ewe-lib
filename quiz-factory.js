/**
 * @file Main module for building a vocabulary quiz
 * @author Ralph L. Rose <rose@waseda.jp>
 * @copyright Ralph L. Rose 2020
 * @license MIT The MIT License
 */

"use strict";

class quizFactory {
    // Key parameters
    _targetContextFreqThreshold = 100;
    _distractorContextFreqThreshold = 40;
    _numOptions = 4;
    _outputFormat = outputFormats.TEXT;
    _frequencyList = "PhraseFinder"; /** @todo create Frequency List module */
    _stemSourceCorpus = "Wikipedia"; /** @question should this specify which Wiki? (English, Simple English) */
    _language = "en";
    _uniqueTargets = false;
    _readabilityIndex = "Linsear Write"; /** @todo create readability module */
    _readabilityLimit = 12;

    /** @constructor */
    constructor() {
        /** initialization here */
    }
}