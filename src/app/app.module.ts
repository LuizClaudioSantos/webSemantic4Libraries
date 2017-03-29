import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule }    from '@angular/http';

import { AppComponent }  from './app.component';

import { OverviewComponent } from './overview/overview.component';
import { SemanitcSuggestionComponent } from './semanticSuggestions/semanticSuggestions.component';
import { RdfaComponent } from './rfda/rdfa.component'

import { StardogService } from './stardog/stardog.service';

import { routing } from './app.route';

import { SuggestionsPipe } from './semanticSuggestions/suggestionsPipe';
import { SchemaPipe } from './semanticSuggestions/schemaPipe'

@NgModule({
  imports:      [ BrowserModule, routing, HttpModule ],
  declarations: [ AppComponent, OverviewComponent, SemanitcSuggestionComponent, RdfaComponent, SuggestionsPipe, SchemaPipe ],
  bootstrap:    [ AppComponent ],
  providers: [ StardogService ]
})
export class AppModule { }
