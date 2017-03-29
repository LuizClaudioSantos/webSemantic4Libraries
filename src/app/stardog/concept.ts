export class Concept {
    
     schema: string;
     language: string;
     label: string;
     uri: string;

     constructor(schema: string, language: string, label: string, uri: string){
         this.schema = schema;
         this.language = language;
         this.label = label;
         this.uri = uri;
     }

     equals(anotherConcept: Concept): Boolean {
        return anotherConcept.uri === this.uri;
     }
}