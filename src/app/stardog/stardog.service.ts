import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Concept } from './concept';

@Injectable()
export class StardogService {

    http: Http;
    headers: Headers;

    //http://localhost:5820/myDB/query?query=SELECT%20%3Fs%20%3Fp%20%3Fo%20%7B%20%3Fs%20%3Fp%20%3Fo%7D
    constructor (http: Http){
        this.http = http;
        this.headers = new Headers();

        this.headers.append('Content-Type', 'application/ld+json');
        this.headers.append('Accept', 'application/sparql-results+json');
        this.headers.append('authorization', 'Basic YWRtaW46YWRtaW4='); 

    }
    
    semanticSuggestions(querySearch : string) : Observable < Object [] > {
            let params = new URLSearchParams();
            let query = `PREFIX skos:<http://www.w3.org/2004/02/skos/core#>` +
                   `PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> ` +
                   `SELECT DISTINCT ?indexableLabel ?conceptURI ?schemeLabel ` +
                        `{ ` +
                            `{ ` +
                                `SELECT DISTINCT ?indexableLabel ?conceptURI ?schemeLabel ` +
                                `WHERE { ` +
                                    `{ ` +
                                        `?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBAuthors>. ` + 
                                        `<http://thesaurus.iadb.org/publicthesauri/IdBAuthors> rdfs:label ?schemeLabel. ` +
                                        `?conceptURI skos:prefLabel ?indexableLabel. ` +
                                        `Filter contains (?indexableLabel, \"${querySearch}\") ` +
                                     `} UNION { ` +   
                                        `?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBAuthors>. ` + 
                                        `<http://thesaurus.iadb.org/publicthesauri/IdBAuthors> rdfs:label ?schemeLabel. ` +
                                        `?conceptURI skos:altLabel ?indexableLabel. ` +
                                        `Filter contains (?indexableLabel, \"${querySearch}\") ` +
                                      `} UNION { ` +  
                                        `?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBAuthors>. ` + 
                                        `<http://thesaurus.iadb.org/publicthesauri/IdBAuthors> rdfs:label ?schemeLabel. ` +
                                        `?conceptURI skos:prefLabel ?mainLabel. ` +
                                        `?conceptURI skos:related ?relatedURI. ` +
                                        `?relatedURI skos:prefLabel ?indexableLabel. ` +
                                        `Filter contains (?mainLabel, \"${querySearch}\") ` +
                                       `} ` +   
                                `} LIMIT 50 ` +
                            `} UNION { ` +
                                `SELECT DISTINCT ?indexableLabel ?conceptURI ?schemeLabel ` +
                                `WHERE { ` +
                                   `{ ` + 
                                        `?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBTopics>. ` +
                                        `<http://thesaurus.iadb.org/publicthesauri/IdBTopics> rdfs:label ?schemeLabel. ` +
                                        `?conceptURI skos:prefLabel ?indexableLabel. ` +
                                        `Filter contains (?indexableLabel, \"${querySearch}\") ` +
                                    `} UNION { ` +
                                        `?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBTopics>. ` +
                                        `<http://thesaurus.iadb.org/publicthesauri/IdBTopics> rdfs:label ?schemeLabel. ` +
                                        `?conceptURI skos:altLabel ?indexableLabel. ` +
                                        `Filter contains (?indexableLabel, \"${querySearch}\") ` +
                                    `} UNION { ` +  
                                         `?conceptURI skos:inScheme <http://thesaurus.iadb.org/publicthesauri/IdBTopics>. ` +
                                        `<http://thesaurus.iadb.org/publicthesauri/IdBTopics> rdfs:label ?schemeLabel. ` +
                                        `?conceptURI skos:prefLabel ?mainLabel. ` +
                                        `?conceptURI skos:related ?relatedURI. ` +
                                        `?relatedURI skos:prefLabel ?indexableLabel. ` +
                                        `Filter contains (?mainLabel, \"${querySearch}\") ` +
                                    `} ` +          
                                `} LIMIT 50 ` +
                             `} ` +
                        `} `;                                     
            params.set("query", query) ;
            return this.http
            .get('http://localhost:5820/myDB/query',{ 'headers': this.headers, 'search' : params })
            .map( response => <Object []> response.json());
    }

}