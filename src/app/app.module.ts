import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountryStandingsComponent } from './country-standings/country-standings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { GameResultsComponent } from './game-results/game-results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryStandingsComponent,
    PageNotFoundComponent,
    GameResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
