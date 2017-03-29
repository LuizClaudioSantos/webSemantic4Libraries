import { Concept } from '../stardog/concept';

export class SuggestionsList {

    authors:  Concept [];

    topics: Concept [];

    constructor(){

        this.authors = [];
        
        this.topics = [];
    }


   addTopic ( concept: Concept ) {
       this.addConcept(concept, 
           this.topics, 
           this.findConcept(concept, this.topics));
   }

   addAuthor ( concept: Concept){
       this.addConcept(concept, 
           this.authors, 
           this.findConcept(concept, this.authors));

   }

   addConcepts( concepts: Concept []) {
        concepts.forEach( (concept: Concept) => {
            if (concept.schema === "IdBTopics") {
                this.addTopic( concept );
            } else if ( concept.schema === "IdBAuthors" ) {
                this.addAuthor( concept );
            }
        });
   }

   private findConcept( concept: Concept, list: Concept [] ): number {
         for(let i: number = 0; i < list.length; i++){
            if(concept.equals(list[i])){
                return i;
            }
         }
         return -1;
   }

   private addConcept(concept: Concept, list: Concept [], index: number ){
       if( index < 0){
           list.push(concept);
       } else if ( this.languagePriorty(list[index].language) < this.languagePriorty( concept.language) ){
           list[index] = concept;
       } 
   }

   private languagePriorty(language: String): number {
       if(language === "en"){
          return 4;
       }else if (language === "es"){
          return 3;
       }else if (language === "pt"){
          return 2;
       } else if (language === "fr" ){
          return 0;
       } 
       return 0;
   }
   

}