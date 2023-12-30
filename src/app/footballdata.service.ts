import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballdataService {
  private getCountryLeagueapi = 'https://v3.football.api-sports.io/standings?';
  private getFixturesapi = 'https://v3.football.api-sports.io/fixtures?'
  private apiKey = 'f13df5c35253f836f3694c6743f7d1ff';
  standingsData$ : Subject<any> = new Subject<any>();
  countryName: string = '';
  countryLeagueId: string = '';
  private cachedData: string[] = [];
  private readonly CACHE_KEY = 'cached_data';
  constructor(private http: HttpClient) {
    const cached = localStorage.getItem(this.CACHE_KEY);
    if (cached) {
      this.cachedData = JSON.parse(cached);

    }
   }

  getFootballCountryData(leagueId: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const requestOptions = {
      headers: headers
    };

    // if (this.cachedData.length) {
    //   return of(this.cachedData);
    // } else {
    return this.http.get<any>(this.getCountryLeagueapi+'league='+leagueId+'&season='+new Date().getFullYear(), requestOptions)
    // pipe(tap(data => {
    //     this.cachedData = data;
    //     localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    //   }));
    // }
  }

  getFixtures(leagueId: string): Observable<any>  {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });
    const requestOptions = {
      headers: headers
    };
    return this.http.get<any>(this.getFixturesapi+'league='+leagueId+'&last=10', requestOptions)
  }

  restoreCachedData() {
 const cachedDataString = localStorage.getItem(this.CACHE_KEY);
 if (cachedDataString) {
   const cachedData: string[] = JSON.parse(cachedDataString);
  this.standingsData$.next(cachedData);
  }
}

  clearCachedData() {
    this.cachedData = [];
    localStorage.removeItem(this.CACHE_KEY); 
  }
}
