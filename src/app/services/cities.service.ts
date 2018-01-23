import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CitiesService {

  private _podaciUrl = 'assets/podaci.json';
  odabraniGradovi: string[] = [];
  tacni: string[];
  brojTacnih;
  brojPogodjenih = 0;
  procenatTacnih = 0;

  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this._http.get(this._podaciUrl)
    .map(
      (response: Response) => {
        const res = response.json();
        this.tacni = res.tacno;
        this.brojTacnih = res.tacno.length;
        console.log(this.tacni);
        return res;
      });
  }

  dodajUListu(grad) {
    this.odabraniGradovi.push(grad);
    this.izracunajProcenatTacnih(grad);
  }

  izracunajProcenatTacnih(grad) {
    this.tacni.forEach(tacan => {
      if (tacan === grad) {
        this.brojPogodjenih++;
        this.procenatTacnih = (this.brojPogodjenih / this.brojTacnih) * 100;
        this.emitujProcenatTacnih();
        console.log(this.procenatTacnih);
      }
    });
  }

  emitujProcenatTacnih() {
    const procenat = Observable.create((observer: Observer<number>) => {
      setInterval(() => {
        observer.next(this.procenatTacnih);
      }, 200);
    });

    return procenat;
  }
}
