import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FootballdataService } from '../footballdata.service';
import { Subscription } from 'rxjs';
import { CountryLeague } from '../models/CountryLeagueInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  countryList: CountryLeague[] = [
    { countryName: 'England', leagueName: 'Premier League', leagueId: '39' },
    { countryName: 'Spain', leagueName: 'La Liga', leagueId: '140' },
    { countryName: 'France', leagueName: 'Ligue 1', leagueId: '61' },
    { countryName: 'Germany', leagueName: 'Bundesliga', leagueId: '78' },
    { countryName: 'Italy', leagueName: 'Serie A', leagueId: '135' }
  ];
  footballDataSubscription: Subscription;
  constructor(private router: Router, private footballApiService: FootballdataService) { 
    this.footballDataSubscription = new Subscription();
  }

  selectCountry(event: Event, country: CountryLeague) {
    event.preventDefault();
    this.footballApiService.countryName = country.countryName;
    this.footballApiService.countryLeagueId = country.leagueId;
    this.router.navigate(['/countryStandings', country.countryName]);
    this.footballDataSubscription = this.footballApiService.getFootballCountryData(country.leagueId).subscribe(
      {
        next: (data) => {
          const standingsData = data.response[0].league.standings[0];
          this.footballApiService.standingsData$.next(standingsData);
        },
        error: (err) => {
          console.error('Error fetching football data:', err);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.footballDataSubscription) {
      this.footballDataSubscription.unsubscribe();
    }
  }
}
