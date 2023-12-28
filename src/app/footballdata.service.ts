import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballdataService {
  private getCountryLeagueapi = 'https://v3.football.api-sports.io/standings?';
  private fixturesapi = '';
  private apiKey = 'f13df5c35253f836f3694c6743f7d1ff';
  standingsData$ : Subject<any> = new Subject<any>();
  countryName: string = '';
  private cachedData: any[] = [];
  private readonly CACHE_KEY = 'cached_data';
  constructor(private http: HttpClient) {
    const cached = localStorage.getItem(this.CACHE_KEY);
    if (cached) {
      this.cachedData = JSON.parse(cached);
    }
   }

  getFootballCountryData(leagueId: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const requestOptions = {
      headers: headers
    };

    if (this.cachedData.length) {
      return of(this.cachedData);
    } else {
    return this.http.get<any>(this.getCountryLeagueapi+'league='+leagueId+'&season='+new Date().getFullYear(), requestOptions).
    pipe(tap(data => {
        this.cachedData = data;
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
      }));
    }}

  getFixtures() {

  }

  restoreCachedData() {
 const cachedDataString = localStorage.getItem(this.CACHE_KEY);

 if (cachedDataString) {
   const cachedData: any[] = JSON.parse(cachedDataString);
  this.standingsData$.next(cachedData);
  }}

  clearCachedData() {
    this.cachedData = [];
    localStorage.removeItem(this.CACHE_KEY); 
  }
}
