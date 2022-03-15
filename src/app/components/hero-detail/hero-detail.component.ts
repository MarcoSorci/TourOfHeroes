import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  isNewHero = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    // const heroId = this.route.snapshot.paramMap.get('id');
    // if (heroId) {
    //   this.heroService.getHero(heroId).subscribe((data) => {
    //     if (data) {
    //       this.isNewHero = true;
    //     }
    //   });
    // }
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (!id) {
      this.hero = { id: 0, name: '', power: '', alterEgo: '' };
    }
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  @Output() insertedHero = new EventEmitter<Hero>();

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
    });
  }
}
