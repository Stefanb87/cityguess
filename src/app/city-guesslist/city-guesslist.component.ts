import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { CitiesService } from './../services/cities.service';

@Component({
  selector: 'app-city-guesslist',
  templateUrl: './city-guesslist.component.html',
  styleUrls: ['./city-guesslist.component.css']
})
export class CityGuesslistComponent implements OnInit {

  gradovi: string[] = [];

  constructor(private _citiesService: CitiesService) { }

  ngOnInit() {
    this.gradovi = this._citiesService.odabraniGradovi;
  }

  removeCity(element: HTMLElement) {
    const grad = element.innerText.substring(0, element.innerText.length - 2);
    this.gradovi.forEach((g, index) => {
      if (g === grad) {
        this.gradovi.splice(index, 1);
      }
    });
  }
}
