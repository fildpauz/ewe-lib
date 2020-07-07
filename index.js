/* Title: index.js (entry point to ewe-lib)
 * Author: Ralph L. Rose
 * E-mail address: rose@waseda.jp
 * Description: Main library for generating vocabulary quizzes
 * License: The MIT License
 */

 "use strict";

 const eweGlobals = {
     ITEMTYPE: {
         MULTICHOICE_CLOZE: "itemtype.multichoice_cloze",
         MULTICHOICE_SYNONYM: "itemtype.multichoice_synonym",
         FREERESPONSE_CLOZE: "itemtype.freeresponse_cloze",
         MULTICHOICE_REARRANGE: "itemtype.multichoice_rearrange",
         MATCHING: "itemtype.matching"
     },
     READABILITY: {
         ARI: "readability.ari", // Automated Readability Index
         LINSEAR: "readability.linsear", // Linsear Write
         FLESCH: "reability.flesch" // Flesch-Kincaid
     },
     FREQUENCY: {
         BAWE: "frequency.bawe", // British Corpus of Academic Written English
         GOOGLE_NGRAMS: "frequnency.google_ngrams" // Google NGrams (via PhraseFinder API)
     },
     CORPUS: {
         EN_WIKIPEDIA: "corpus.en_wikipedia", // (Regular) English Wikipedia
         SE_WIKIPEDIA: "corpus.se_wikipedia", // Simple English Wikipedia
         VOANEWS: "corpus.voanews", // Voice of America News (in Special English)
         PLOSONE: "corpus.plosone"
     }
 }