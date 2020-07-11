/**
 * @file Main library for outputting formatted vocabulary quizzes
 * @author Ralph L. Rose <rose@waseda.jp>
 * @copyright Ralph L. Rose 2020
 * @license MIT The MIT License
 */

"use strict";

const outputFormats = {
    "TEXT": "plain text",
    "DOCX": "MS Word",
    "MOODLEXML": "Moodle XML",
    "CSV": "csv",
    "QUIZLET": "quizlet"
}

class quizFormatter {
    _outputFormat = outputFormats.TEXT;

    /** @constructor */
    constructor() {
        /** initialization here */
    }
}