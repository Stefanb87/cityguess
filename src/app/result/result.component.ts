import { Component, OnInit, OnDestroy } from '@angular/core';
import { CitiesService } from './../services/cities.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  procenat;
  procenatSubscription: Subscription;

  constructor(private _citiesService: CitiesService) { }

  ngOnInit() {
    // uzima procenat iz servisa
    this.procenatSubscription = this._citiesService.emitujProcenatTacnih().subscribe((number: number) => {
                                  this.procenat = number;
                                });
  }

  // reset polja u servisu za novu igru
  resetIgre() {
    this._citiesService.odabraniGradovi = [];
    this._citiesService.procenatTacnih = 0;
    this._citiesService.brojPogodjenih = 0;
  }

  ngOnDestroy() {
    this.procenatSubscription.unsubscribe();
  }

}
