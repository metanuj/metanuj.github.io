import {RouterModule, Routes} from '@angular/router';
import {ContactListComponent} from './contactList.component';
import {AboutComponent} from './about.component';
import {HelpComponent} from './help.component';
import {PageNotFoundComponent} from './pagenotfound.component';

export const routes: Routes = [
    {path: '', redirectTo: 'contactList', pathMatch: 'full'},
    {path: 'contactList', component: ContactListComponent},
    {path: 'aboutus', component: AboutComponent},
    {path: 'help', component: HelpComponent},
    {path: '**', component: PageNotFoundComponent}
];

export const headerRouting = RouterModule.forRoot(routes);