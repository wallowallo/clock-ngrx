import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { clock, people } from './reducers';

import { AppComponent } from './app.component';

//only need to add custom components to the app.modules declarations
import { Clock } from './clock';
import { People } from './people';

import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    Clock,
    People
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({clock, people})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
