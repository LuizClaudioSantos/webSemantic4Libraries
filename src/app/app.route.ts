import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { SemanitcSuggestionComponent } from './semanticSuggestions/semanticSuggestions.component';
import { RdfaComponent } from './rfda/rdfa.component';


const appRoutes: Routes = [
    {path: '', component: OverviewComponent},
    {path: 'semanticSuggestions', component: SemanitcSuggestionComponent},
    {path: 'rdfa', component: RdfaComponent},
    {path: '**', redirectTo: ''}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);