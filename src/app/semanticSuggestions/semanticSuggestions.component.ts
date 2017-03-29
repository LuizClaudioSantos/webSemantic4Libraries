import { Component } from '@angular/core';

import { StardogService } from '../stardog/stardog.service';

import { Concept } from '../stardog/concept';

import { SuggestionsPipe } from './suggestionsPipe';

import { SuggestionsList } from './suggestionsList';



@Component({
    moduleId: module.id,
    selector: 'semanticSuggestion',
    templateUrl: 'semanticSuggestions.component.html',
    providers: [StardogService],
    styleUrls:  ['./semanticSuggestions.css']
}) 
export class SemanitcSuggestionComponent {

    authors : Concept [] = []; 
  
    topics : Concept [] = [];

    noBorder = true;

    query: String = "";

    constructor (private service: StardogService) { }

    getSuggestions( query: string ){
       
        if(this.isEmpty(query)){
            this.noBorder = true;
            this.deleteLists();
        }else{
            this.noBorder = false;
            this.service.semanticSuggestions(query).subscribe((res ) => {
                
                let suggestions: Concept [] = res["results"]["bindings"].map( ( result: Object) => { 
                    return new Concept(result["schemeLabel"]["value"] ,
                         result["indexableLabel"]["xml:lang"], 
                         result["indexableLabel"]["value"], 
                         result["conceptURI"]["value"]);
                });
                let list: SuggestionsList = new SuggestionsList();
                list.addConcepts(suggestions);  
                this.authors = list.authors;
                this.topics = list.topics;


            }, error => console.log(error));
         }
    }

    selectConcept(event: Event, concept: String){
       this.query = concept;
       this.noBorder = true;
       this.deleteLists();
    }

    private isEmpty(val: String){
       return (val === undefined || val == null || val.length <= 0) ? true : false;
    }
      
    private deleteLists(){
       this.authors = [];
       this.topics = [];
    }  
}