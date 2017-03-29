"use strict";
var Concept = (function () {
    function Concept(schema, language, label, uri) {
        this.schema = schema;
        this.language = language;
        this.label = label;
        this.uri = uri;
    }
    Concept.prototype.equals = function (anotherConcept) {
        return anotherConcept.uri === this.uri;
    };
    return Concept;
}());
exports.Concept = Concept;
//# sourceMappingURL=concept.js.map