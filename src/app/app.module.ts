import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CovidDataComponent } from './covid-data/covid-data.component';
import { CovidService } from './covid.service';

const routes: Routes = [
  { path: '', redirectTo: '/covid-data', pathMatch: 'full' },
  { path: 'covid-data', component: CovidDataComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CovidDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CovidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
