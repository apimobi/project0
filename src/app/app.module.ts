import { NgModule, trigger, state, style, animate, transition  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing }        from './app.routing';
import { AppComponent }  from './app.component';
import { FacebookService } from './services/facebook.service';
import { DataService } from './services/data.service';
import { HomePage } from './components/home-page/home-page.component';
import { NewCompComponent } from './new-comp/new-comp.component';
import { PageNotFound } from './components/page-not-found/page-not-found.component';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdGridListModule } from '@angular2-material/grid-list';
import { ParametersService } from './services/parameters.service';


@NgModule({
  imports: [ 
    BrowserModule,
    routing,
    MdButtonModule,
    MdCardModule,
    MdGridListModule
    ],
  providers: [
    FacebookService,
    DataService,
    ParametersService
    ],
  declarations: [ AppComponent, HomePage, PageNotFound, NewCompComponent ],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
