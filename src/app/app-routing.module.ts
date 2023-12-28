import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryStandingsComponent } from './country-standings/country-standings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameResultsComponent } from './game-results/game-results.component';

const routes: Routes = [
  //  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to '/home'
  // { path: 'home', component: HomeComponent }, 
   {path: 'countryStandings/:countryName', component: CountryStandingsComponent},
   {path: 'game-results/:teamName', component: GameResultsComponent}
  // { path: '**', component: PageNotFoundComponent },
  // { path: '**', redirectTo: '/404' } // Redirect to 'Page Not Found' for any unknown route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
