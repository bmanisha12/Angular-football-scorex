import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballdataService } from '../footballdata.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-standings',
  templateUrl: './country-standings.component.html',
  styleUrls: ['./country-standings.component.css']
})
export class CountryStandingsComponent implements OnInit{
  data:any[] = [
    { 'Sr.No': 1, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12}, // Add more objects as needed
    { 'Sr.No': 2, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12},
    { 'Sr.No': 3, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12},
    { 'Sr.No': 4, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12},
    { 'Sr.No': 5, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12},
    { 'Sr.No': 6, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12},
    { 'Sr.No': 7, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12},
    { 'Sr.No': 8, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12},
    { 'Sr.No': 9, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12},
    { 'Sr.No': 10, Symbol: '', Name: 'Manchester City', Games: 4, W: 4, L: 0, D: 9, 'Goal Difference': 9, Points: 12}   // Add more objects as needed
  ];

  tableHeaders: any[] = ['Sr.No', 'Symbol', 'Name', 'Games', 'W', 'L', 'D', 'Goal Difference', 'Points']; // Add headers for your table

  tableKeys = Object.keys(this.data[0]); // Assuming the keys are the same for all objects in the data array

  standingsData: any;
 
  constructor(private router: Router, private footballApiService: FootballdataService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
this.footballApiService.standingsData$.subscribe((data: any)=> {
this.standingsData = data;
});
  }

  selectTeam(event: any, team: any) {
    const countryName = this.activatedRoute.snapshot.params['countryName'];
    // this.router.navigate(['/country', countryName, '/game-results', team.team.name]);

    this.router.navigate(['game-results', team.team.name ]);
  }
}
