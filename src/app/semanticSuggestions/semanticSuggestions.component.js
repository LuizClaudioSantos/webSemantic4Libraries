"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var stardog_service_1 = require('../stardog/stardog.service');
var concept_1 = require('../stardog/concept');
var suggestionsList_1 = require('./suggestionsList');
var SemanitcSuggestionComponent = (function () {
    function SemanitcSuggestionComponent(service) {
        this.service = service;
        this.authors = [];
        this.topics = [];
        this.noBorder = true;
        this.query = "";
    }
    SemanitcSuggestionComponent.prototype.getSuggestions = function (query) {
        var _this = this;
        if (this.isEmpty(query)) {
            this.noBorder = true;
            this.deleteLists();
        }
        else {
            this.noBorder = false;
            this.service.semanticSuggestions(query).subscribe(function (res) {
                var suggestions = res["results"]["bindings"].map(function (result) {
                    return new concept_1.Concept(result["schemeLabel"]["value"], result["indexableLabel"]["xml:lang"], result["indexableLabel"]["value"], result["conceptURI"]["value"]);
                });
                var list = new suggestionsList_1.SuggestionsList();
                list.addConcepts(suggestions);
                _this.authors = list.authors;
                _this.topics = list.topics;
            }, function (error) { return console.log(error); });
        }
    };
    SemanitcSuggestionComponent.prototype.selectConcept = function (event, concept) {
        this.query = concept;
        this.noBorder = true;
        this.deleteLists();
    };
    SemanitcSuggestionComponent.prototype.isEmpty = function (val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    };
    SemanitcSuggestionComponent.prototype.deleteLists = function () {
        this.authors = [];
        this.topics = [];
    };
    SemanitcSuggestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'semanticSuggestion',
            templateUrl: 'semanticSuggestions.component.html',
            providers: [stardog_service_1.StardogService],
            styleUrls: ['./semanticSuggestions.css']
        }), 
        __metadata('design:paramtypes', [stardog_service_1.StardogService])
    ], SemanitcSuggestionComponent);
    return SemanitcSuggestionComponent;
}());
exports.SemanitcSuggestionComponent = SemanitcSuggestionComponent;
//# sourceMappingURL=semanticSuggestions.component.js.map