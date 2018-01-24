import { CitiesService } from './../services/cities.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/debounceTime';
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
  filteredOptions: Observable<string[]>;
  greskaGrad: boolean;

  constructor(private _citiesService: CitiesService, private _router: Router) { }

  ngOnInit() {
    this.podaciSubscription = this._citiesService.getData()
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

    this.filteredOptions = this.myControl.valueChanges
                          .pipe(startWith(''), map(val => this.filter(val)));

    this.greskaGrad = this._citiesService.greska;
  }

  add(input: HTMLFormElement, form) {
    this._citiesService.dodajUListu(input.value);

    if (this._citiesService.greska) {
      this.greskaGrad = this._citiesService.greska;
    } else {
      this.greskaGrad = false;
    }
  }

  filter(val): string[] {
    return this.podaci.ponudjene.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  ngOnDestroy() {
    this.podaciSubscription.unsubscribe();
  }

}
