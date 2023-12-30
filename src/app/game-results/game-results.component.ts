import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballdataService } from '../footballdata.service';
import { Subscription } from 'rxjs';
import { ApiResponse } from '../models/FixtureDataInteface';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit{
fixtureData: ApiResponse ;
  fixturesDataSubscription: Subscription;;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private footballApiService: FootballdataService,
  ) {
    this.fixturesDataSubscription = new Subscription();
    this.fixtureData = {};
  }

  ngOnInit() {
    this.fixturesDataSubscription = this.footballApiService.getFixtures(this.footballApiService.countryLeagueId).subscribe(
      {
        next: (data: ApiResponse) => {
         this.fixtureData = data;
         console.log("fixtureData = ",data)
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

interface GameFixture {

}