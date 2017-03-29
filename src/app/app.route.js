"use strict";
var router_1 = require('@angular/router');
var overview_component_1 = require('./overview/overview.component');
var semanticSuggestions_component_1 = require('./semanticSuggestions/semanticSuggestions.component');
var rdfa_component_1 = require('./rfda/rdfa.component');
var appRoutes = [
    { path: '', component: overview_component_1.OverviewComponent },
    { path: 'semanticSuggestions', component: semanticSuggestions_component_1.SemanitcSuggestionComponent },
    { path: 'rdfa', component: rdfa_component_1.RdfaComponent },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.route.js.map