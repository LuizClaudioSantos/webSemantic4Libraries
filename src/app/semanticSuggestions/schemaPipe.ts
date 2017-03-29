import { Pipe, PipeTransform } from '@angular/core';

import { Concept } from '../stardog/concept';

@Pipe({
    name: 'schemaPipe'

})
export class SchemaPipe implements PipeTransform {

    transform( concept : Concept []){
        return concept.length == 0;
    }

}