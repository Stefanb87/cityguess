import { Component, OnInit } from '@angular/core';
import { CitiesService } from './../services/cities.service';

@Component({
  selector: 'app-city-guesslist',
  templateUrl: './city-guesslist.component.html',
  styleUrls: ['./city-guesslist.component.css']
})
export class CityGuesslistComponent implements OnInit {

  gradovi: string[] = [];

  constructor(private _citiesService: CitiesService) {}

  ngOnInit() {
    // uzima gradove iz polja u servisu
    this.gradovi = this._citiesService.odabraniGradovi;
  }

  // uklanja grad iz liste i reklakulise procenat (poziva metodu za oduzimanje iz servisa)
  ukloni(element: HTMLElement) {
    const grad = element.innerText.substring(0, element.innerText.length - 2);
    this.gradovi.forEach((g, index) => {
      if (g === grad) {
        this.gradovi.splice(index, 1);
        this._citiesService.oduzmiProcenat(grad);
      }
    });
  }

  zavrsi() {
    this._citiesService.odabraniGradovi = [];
  }
}
