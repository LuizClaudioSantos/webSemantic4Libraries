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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
var StardogService = (function () {
    //http://localhost:5820/myDB/query?query=SELECT%20%3Fs%20%3Fp%20%3Fo%20%7B%20%3Fs%20%3Fp%20%3Fo%7D
    function StardogService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/ld+json');
        this.headers.append('Accept', 'application/sparql-results+json');
        this.headers.append('authorization', 'Basic YWRtaW46YWRtaW4=');
    }
    StardogService.prototype.semanticSuggestions = function (querySearch) {
        var params = new http_1.URLSearchParams();
        /*
        let query = `PREFIX skos:<http://www.w3.org/2004/02/skos/core#>` +
               `PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> ` +
               `SELECT DISTINCT ?indexableLabel ?conceptURI ?schemeLabel ` +
                    `{ ` +
                        `{ ` +
                            `SELECT DISTINCT ?indexableLabel ?conceptURI ?schemeLabel ` +
                            `WHERE { ` +
                               `?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBAuthors>. ` +
                               `<http://thesaurus.iadb.org/publicthesauri/IdBAuthors> rdfs:label ?schemeLabel. ` +
                               `?conceptURI skos:prefLabel ?indexableLabel. ` +
                               `Filter contains (?indexableLabel, \"${querySearch}\") ` +
                            `} LIMIT 16 ` +
                        `} UNION { ` +
                            `SELECT DISTINCT ?indexableLabel ?conceptURI ?schemeLabel ` +
                            `WHERE { ` +
                               `?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBTopics>. ` +
                               `<http://thesaurus.iadb.org/publicthesauri/IdBTopics> rdfs:label ?schemeLabel. ` +
                               `?conceptURI skos:prefLabel ?indexableLabel. ` +
                               `Filter contains (?indexableLabel, \"${querySearch}\") ` +
                            `} LIMIT 16 ` +
                         `} ` +
                    `} `;
       */
        var query = "PREFIX skos:<http://www.w3.org/2004/02/skos/core#>" +
            "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> " +
            "SELECT DISTINCT ?indexableLabel ?conceptURI ?schemeLabel " +
            "{ " +
            "{ " +
            "SELECT DISTINCT ?indexableLabel ?conceptURI ?schemeLabel " +
            "WHERE { " +
            "{ " +
            "?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBAuthors>. " +
            "<http://thesaurus.iadb.org/publicthesauri/IdBAuthors> rdfs:label ?schemeLabel. " +
            "?conceptURI skos:prefLabel ?indexableLabel. " +
            ("Filter contains (?indexableLabel, \"" + querySearch + "\") ") +
            "} UNION { " +
            "?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBAuthors>. " +
            "<http://thesaurus.iadb.org/publicthesauri/IdBAuthors> rdfs:label ?schemeLabel. " +
            "?conceptURI skos:altLabel ?indexableLabel. " +
            ("Filter contains (?indexableLabel, \"" + querySearch + "\") ") +
            "} UNION { " +
            "?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBAuthors>. " +
            "<http://thesaurus.iadb.org/publicthesauri/IdBAuthors> rdfs:label ?schemeLabel. " +
            "?conceptURI skos:prefLabel ?mainLabel. " +
            "?conceptURI skos:related ?relatedURI. " +
            "?relatedURI skos:prefLabel ?indexableLabel. " +
            ("Filter contains (?mainLabel, \"" + querySearch + "\") ") +
            "} " +
            "} LIMIT 50 " +
            "} UNION { " +
            "SELECT DISTINCT ?indexableLabel ?conceptURI ?schemeLabel " +
            "WHERE { " +
            "{ " +
            "?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBTopics>. " +
            "<http://thesaurus.iadb.org/publicthesauri/IdBTopics> rdfs:label ?schemeLabel. " +
            "?conceptURI skos:prefLabel ?indexableLabel. " +
            ("Filter contains (?indexableLabel, \"" + querySearch + "\") ") +
            "} UNION { " +
            "?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBTopics>. " +
            "<http://thesaurus.iadb.org/publicthesauri/IdBTopics> rdfs:label ?schemeLabel. " +
            "?conceptURI skos:altLabel ?indexableLabel. " +
            ("Filter contains (?indexableLabel, \"" + querySearch + "\") ") +
            "} UNION { " +
            "?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBTopics>. " +
            "<http://thesaurus.iadb.org/publicthesauri/IdBTopics> rdfs:label ?schemeLabel. " +
            "?conceptURI skos:prefLabel ?mainLabel. " +
            "?conceptURI skos:related ?relatedURI. " +
            "?relatedURI skos:prefLabel ?indexableLabel. " +
            ("Filter contains (?mainLabel, \"" + querySearch + "\") ") +
            "} " +
            "} LIMIT 50 " +
            "} " +
            "} ";
        params.set("query", query);
        return this.http
            .get('http://localhost:5820/myDB/query', { 'headers': this.headers, 'search': params })
            .map(function (response) { return response.json(); });
    };
    StardogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], StardogService);
    return StardogService;
}());
exports.StardogService = StardogService;
//# sourceMappingURL=stardog.service.js.map