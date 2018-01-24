import { CitiesService } from './../services/cities.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css']
})
export class CityInputComponent implements OnInit, OnDestroy {

  podaci;
  vreme;
  podaciSubscription: Subscription;
  myControl: FormControl = new FormControl();
  filtrirano: Observable<string[]>;
  greskaGrad: boolean;

  constructor(private _citiesService: CitiesService, private _router: Router) { }

  ngOnInit() {
    // ovde uzima podatke i odbrojava vreme
    this.podaciSubscription = this._citiesService.uzmiPodatke()
                              .subscribe((podaci) => {
                                this.podaci = podaci;
                                this.vreme = setInterval(() => {
                                  podaci.vreme--;
                                  if (podaci.vreme === 0) {
                                    clearInterval(this.vreme);
                                    this._router.navigate(['result']);
                                  }
                                }, 1000);
                              });

    this.filtrirano = this.myControl.valueChanges
                          .pipe(startWith(''), map(val => this.filter(val)));

    this.greskaGrad = this._citiesService.greska;
  }

  // metoda za dodavanje gradova u listu i set polja za gresku (validacija)
  dodaj(input: HTMLFormElement) {
    this._citiesService.dodajUListu(input.value);

    this._citiesService.greska ? this.greskaGrad = true : this.greskaGrad = false;
  }

  // metoda za filtriranje gradova u autocomplete polju
  filter(val): string[] {
    return this.podaci.ponudjene.filter(ponudjen =>
      ponudjen.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  ngOnDestroy() {
    this.podaciSubscription.unsubscribe();
  }

}
