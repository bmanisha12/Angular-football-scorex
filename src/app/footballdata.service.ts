import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballdataService {
  private getCountryLeagueapi = 'https://v3.football.api-sports.io/standings?';
  private apiKey = 'f13df5c35253f836f3694c6743f7d1ff'; // Replace with your API key

  // private standingsDataSubject = new BehaviorSubject<any[]>([]);
  // standingsData$ = this.standingsDataSubject.asObservable();

  standingsData$ : Subject<any> = new Subject<any>();
  
  constructor(private http: HttpClient) { }

  getFootballCountryData(leagueId: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const requestOptions = {
      headers: headers
    };
    // https://v3.football.api-sports.io/standings?league=39&season=2019
    return this.http.get<any>(this.getCountryLeagueapi+'league='+leagueId+'&season='+new Date().getFullYear(), requestOptions);
  }
}
