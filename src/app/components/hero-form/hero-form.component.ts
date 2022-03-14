import { Component, EventEmitter, Output } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';


@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent {

  constructor(private heroService: HeroService) {}

  

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  @Output() insertedHero = new EventEmitter<Hero>()

  model: Hero = {
    id: -1,
    name: '',
    power: '',
    alterEgo: '',
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.heroService.addHero(this.model as Hero).subscribe((hero) => {
      this.insertedHero.emit(hero);
    })
  }

  newHero() {
    this.model = { id: 42, name: '', power: '' };
  }
}
