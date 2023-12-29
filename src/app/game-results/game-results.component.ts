import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballdataService } from '../footballdata.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit{
fixtureData: any;
  fixturesDataSubscription: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private footballApiService: FootballdataService,
  ) {}

  ngOnInit() {
    this.fixturesDataSubscription = this.footballApiService.getFixtures(this.footballApiService.countryLeagueId).subscribe(
      {
        next: (data: any) => {
         this.fixtureData = data;
        },
        error: (err) => {
          console.error('Error fetching football data:', err);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.fixturesDataSubscription) {
      this.fixturesDataSubscription.unsubscribe();
    }
  }

  goBack() {
    const teamName = this.activatedRoute.snapshot.params['teamName'];
    this.footballApiService.restoreCachedData();
    this.router.navigate(['/countryStandings', this.footballApiService.countryName]);
  }

}
