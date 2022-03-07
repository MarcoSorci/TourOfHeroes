import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../hero';
import { HEROES } from '../../mock-heroes';

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

  heroes = HEROES;
  selectedHero?: Hero;

  constructor(heroServ: HeroService) { }

  ngOnInit(): void {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}