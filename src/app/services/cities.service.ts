import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

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

  // uzima podatke iz JSON-a i setuje polja za tacne odgovore i broj tacnih (za izracunavanje procenta)
  uzmiPodatke(): Observable<any> {
    return this._http.get(this._podaciUrl)
    .map(
      (response: Response) => {
        const res = response.json();
        this.tacni = res.tacno;
        this.brojTacnih = res.tacno.length;
        return res;
      });
  }

  // dodaje gradove u listu i vraca gresku ako je duplikat ili prazna vrednost
  dodajUListu(grad): boolean {
    if (this.odabraniGradovi.filter(g => g === grad).length === 0 && grad !== '') {
      this.odabraniGradovi.push(grad);
      this.izracunajProcenatTacnih(grad);
      this.greska = false;
      return true;
    } else {
      this.greska = true;
      return false;
    }
  }

  // sabira procenat tacnih i poziva metodu za emit procenta
  izracunajProcenatTacnih(grad) {
    this.tacni.forEach(tacan => {
      if (tacan === grad) {
        this.brojPogodjenih++;
        this.procenatTacnih = (this.brojPogodjenih / this.brojTacnih) * 100;
        this.emitujProcenatTacnih();
      }
    });
  }

  // oduzima procenat i poziva metodu za emit procenta
  oduzmiProcenat(grad) {
    this.tacni.forEach((tacan, index) => {
      if (tacan === grad) {
        this.brojPogodjenih--;
        this.procenatTacnih = (this.brojPogodjenih / this.brojTacnih) * 100;
        this.emitujProcenatTacnih();
      }
    });
  }

  // metoda za emit procenta
  emitujProcenatTacnih() {
    const procenat = Observable.create((observer: Observer<number>) => {
      setInterval(() => {
        observer.next(this.procenatTacnih);
      }, 200);
    });

    return procenat;
  }
}
