import { CitiesService } from './services/cities.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CityInputComponent } from './city-input/city-input.component';
import { CityGuesslistComponent } from './city-guesslist/city-guesslist.component';
import { ResultComponent } from './result/result.component';
import { CityHomeComponent } from './city-home/city-home.component';

@NgModule({
  declarations: [
    AppComponent,
    CityInputComponent,
    CityGuesslistComponent,
    ResultComponent,
    CityHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: CityHomeComponent },
      { path: 'result', component: ResultComponent },
      { path: '**', component: CityHomeComponent }
    ]),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [CitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
