import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { TournamentService } from './services/tournament.service';
import { OverviewComponent } from './components/overview/overview.component';




const appRoutes: Routes = [
  { path: '', component: OverviewComponent },


]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OverviewComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
  ],
  providers: [
    TournamentService,



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
