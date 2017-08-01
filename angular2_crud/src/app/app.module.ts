import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {headerRouting} from './components/header.route';
import {HeaderComponent} from './components/header.component';
import {FooterComponent} from './components/footer.component';
import {ContactListComponent} from './components/contactList.component';
import {AboutComponent} from './components/about.component';
import {HelpComponent} from './components/help.component';
import {PageNotFoundComponent} from './components/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, FooterComponent, ContactListComponent, AboutComponent, HelpComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    headerRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
