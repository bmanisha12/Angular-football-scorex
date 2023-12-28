import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  goBack() {
    const countryName = this.activatedRoute.snapshot.params['countryName'];
    const teamName = this.activatedRoute.snapshot.params['teamName'];
    this.router.navigate(['/countryStandings', countryName, '/game-results', teamName]);
  }

  // goBack() {
  //   const countryId = this.activatedRoute.snapshot.params['countryId'];
  //   const stateId = this.activatedRoute.snapshot.params['stateId'];
  //   this.router.navigate(['/country', countryId, 'state', stateId]);
  // }
}
