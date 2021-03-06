import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>(); //Subject is a repeatable observable

  constructor(private heroService: HeroService) {}

  search(term: string): void {
    this.searchTerms.next(term); //like push, but for Observables/Subjects
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // pipes before using searchTerms
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))

      // THESE ARE ALL RXJS OPERATORS (imported at the top)
    );
  }
}
