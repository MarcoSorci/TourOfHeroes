import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HeroService } from 'src/app/services/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  // hero: Hero = {   //typing the Hero type automatically imports it
  //   id: 1,
  //   name: 'Windstorm'
  // };
  
  selectedHero?: Hero;
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

}