import { Component, OnInit } from '@angular/core';
import { CitiesService } from './../services/cities.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  procenat;

  constructor(private _citiesService: CitiesService) { }

  ngOnInit() {
    this._citiesService.emitujProcenatTacnih().subscribe((number: number) => {
      this.procenat = number;
    });
  }

}
