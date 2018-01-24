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
  greska: boolean;

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

  dodajUListu(grad): boolean {
    if (this.odabraniGradovi.filter(g => g === grad).length === 0) {
      this.odabraniGradovi.push(grad);
      this.izracunajProcenatTacnih(grad);
      return true;
    } else {
      this.greska = false;
      return false;
    }
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

  oduzmiProcenat(grad) {
    this.tacni.forEach((tacan, index) => {
      if (tacan === grad) {
        this.brojPogodjenih--;
        this.procenatTacnih = (this.brojPogodjenih / this.brojTacnih) * 100;
        this.emitujProcenatTacnih();
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
