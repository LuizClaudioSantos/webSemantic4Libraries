import { Pipe, PipeTransform } from '@angular/core';

import { Concept } from '../stardog/concept';


@Pipe({
    name: 'suggestionsPipe'

})
export class SuggestionsPipe implements PipeTransform {

    transform( concepts : Concept[] ){
        return concepts.map(concept => concept.label);
    }

}