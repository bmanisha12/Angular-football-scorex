import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballdataService } from '../footballdata.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private footballApiService: FootballdataService,
  ) {}

  goBack() {
    const teamName = this.activatedRoute.snapshot.params['teamName'];
    this.footballApiService.restoreCachedData();
    this.router.navigate(['/countryStandings', this.footballApiService.countryName]);
  }

}
