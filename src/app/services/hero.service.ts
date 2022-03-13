import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>('https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes')
      .pipe(
        tap((_) => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  getHero(id: number): Observable<Hero> {
    return this.http
      .get<Hero>('https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes/' + id)
      .pipe(
        tap((_) => this.log('fetched hero id=' + id)),
        catchError(this.handleError<Hero>('getHero id=' + id))
      );
  }
  log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      //trim removes whitespaces start and end, just to make sure
      return of([]); //returns empty Hero array, "of" links to the observable?
    }
    return this.http
      .get<Hero[]>(
        'https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes/?name=' + term
      )
      .pipe(
        tap((x) =>
          x.length //if the received array contains stuff
            ? this.log('found heroes matching ' + term)
            : this.log('no heroes matching ' + term)
        ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(operation + ' failed: ' + error.message);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http
      .put(
        'https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes',
        hero,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log('updated hero id=' + hero.id)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(
        'https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes',
        hero,
        this.httpOptions
      )
      .pipe(
        tap((newHero: Hero) => this.log('added hero with id=' + newHero.id)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = 'https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes/' + id;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log('deleted hero id=' + id)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  
}
