import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballdataService } from '../footballdata.service';
import { Observable } from 'rxjs';
import { CountryLeague } from '../models/CountryLeagueInterface';
import { TeamStanding } from '../models/TeamStandings';

@Component({
  selector: 'app-country-standings',
  templateUrl: './country-standings.component.html',
  styleUrls: ['./country-standings.component.css']
})
export class CountryStandingsComponent implements OnInit {

  tableHeaders: string[] = ['Sr.No', 'Symbol', 'Name', 'Games', 'W', 'L', 'D', 'Goal Difference', 'Points']; // Add headers for your table

  standingsData: TeamStanding[];

  clickCounter:number = 0;

  countryList: CountryLeague[] = [
    { countryName: 'England', leagueName: 'Premier League', leagueId: '39' },
    { countryName: 'Spain', leagueName: 'La Liga', leagueId: '140' },
    { countryName: 'France', leagueName: 'Ligue 1', leagueId: '61' },
    { countryName: 'Germany', leagueName: 'Bundesliga', leagueId: '78' },
    { countryName: 'Italy', leagueName: 'Serie A', leagueId: '135' }
  ];
  
  constructor(private router: Router, private footballApiService: FootballdataService,
    private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {
   this.standingsData = []
  }

  ngOnInit() {
    this.footballApiService.standingsData$.subscribe((data: TeamStanding[]) => {
      this.standingsData = data;
      // console.log("this.standingsData = ", this.standingsData)
      this.cdr.detectChanges();
    });
  }

  selectTeam(event: Event, team: TeamStanding) {
     const countryName = this.activatedRoute.snapshot.params['countryName'];
    this.router.navigate(['game-results', team.team.name]);
    if (this.clickCounter > 1) {
      this.footballApiService.clearCachedData();
    }
    this.clickCounter = this.clickCounter + 1;
  }
}
