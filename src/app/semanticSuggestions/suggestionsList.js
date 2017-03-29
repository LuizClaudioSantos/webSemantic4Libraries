"use strict";
var SuggestionsList = (function () {
    function SuggestionsList() {
        this.authors = [];
        this.topics = [];
    }
    SuggestionsList.prototype.addTopic = function (concept) {
        this.addConcept(concept, this.topics, this.findConcept(concept, this.topics));
    };
    SuggestionsList.prototype.addAuthor = function (concept) {
        this.addConcept(concept, this.authors, this.findConcept(concept, this.authors));
    };
    SuggestionsList.prototype.addConcepts = function (concepts) {
        var _this = this;
        concepts.forEach(function (concept) {
            if (concept.schema === "IdBTopics") {
                _this.addTopic(concept);
            }
            else if (concept.schema === "IdBAuthors") {
                _this.addAuthor(concept);
            }
        });
    };
    SuggestionsList.prototype.findConcept = function (concept, list) {
        for (var i = 0; i < list.length; i++) {
            if (concept.equals(list[i])) {
                return i;
            }
        }
        return -1;
    };
    SuggestionsList.prototype.addConcept = function (concept, list, index) {
        if (index < 0) {
            list.push(concept);
        }
        else if (this.languagePriorty(list[index].language) < this.languagePriorty(concept.language)) {
            list[index] = concept;
        }
    };
    SuggestionsList.prototype.languagePriorty = function (language) {
        if (language === "en") {
            return 4;
        }
        else if (language === "es") {
            return 3;
        }
        else if (language === "pt") {
            return 2;
        }
        else if (language === "fr") {
            return 0;
        }
        return 0;
    };
    return SuggestionsList;
}());
exports.SuggestionsList = SuggestionsList;
//# sourceMappingURL=suggestionsList.js.map