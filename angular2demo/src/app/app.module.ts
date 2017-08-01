import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './product-form.component';
import { AppProduct } from './components/product.component';
import { AppInventory } from './components/inventory.component';  
import { PageNotFound } from './components/pagenotfound.component';
import {HeaderConponent } from './components/header.component';
import {contactFormComponent} from './components/contactForm.component';
import {ReactiveFormComponent} from './components/reactiveForm.component';
import {ReactiveScothComponent} from './components/reactiveScoth.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'product', pathMatch: 'full'}, 
   { path: 'product', component: AppProduct }, 
   { path: 'inventory/:id', component: AppInventory },
   { path: 'contactForm', component: contactFormComponent },
   { path: 'reactiveForm', component: ReactiveFormComponent },
   { path: 'reactiveScoth', component: ReactiveScothComponent },
   { path: '**', component: PageNotFound }  
];  
@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent, 
    AppProduct, AppInventory,
    PageNotFound, HeaderConponent, 
    contactFormComponent, 
    ReactiveFormComponent, 
    ReactiveScothComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
