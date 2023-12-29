import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballdataService } from '../footballdata.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-standings',
  templateUrl: './country-standings.component.html',
  styleUrls: ['./country-standings.component.css']
})
export class CountryStandingsComponent implements OnInit {

  tableHeaders: any[] = ['Sr.No', 'Symbol', 'Name', 'Games', 'W', 'L', 'D', 'Goal Difference', 'Points']; // Add headers for your table

  standingsData: any;

  clickCounter = 0;

  countryList: any = [
    { countryName: 'England', leagueName: 'Premier League', leagueId: '39' },
    { countryName: 'Spain', leagueName: 'La Liga', leagueId: '140' },
    { countryName: 'France', leagueName: 'Ligue 1', leagueId: '61' },
    { countryName: 'Germany', leagueName: 'Bundesliga', leagueId: '78' },
    { countryName: 'Italy', leagueName: 'Serie A', leagueId: '135' }
  ];
  
  constructor(private router: Router, private footballApiService: FootballdataService,
    private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.footballApiService.standingsData$.subscribe((data: any) => {
      this.standingsData = data;
      this.cdr.detectChanges();
    });
  }

  selectTeam(event: any, team: any) {
    const countryName = this.activatedRoute.snapshot.params['countryName'];
    this.router.navigate(['game-results', team.team.name]);
    if (this.clickCounter > 1) {
      this.footballApiService.clearCachedData();
    }
    this.clickCounter = this.clickCounter + 1;
  }
}
