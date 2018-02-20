import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import {StatusService} from './services/status.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
  MatSidenavModule, MatMenuModule, MatCardModule, MatListModule, MatGridListModule,
  MatSlideToggleModule, MatInputModule, MatSelectModule, MatButtonToggleModule,
  MatSliderModule} from '@angular/material';
  import { GaugeModule } from 'angular-gauge';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { DataShowComponent } from './components/data-show/data-show.component';
import { MusicboxComponent } from './components/musicbox/musicbox.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DataShowComponent,
    MusicboxComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule,
    FormsModule, HttpModule, MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatMenuModule,
    MatCardModule, MatListModule, MatGridListModule, MatSliderModule,
    MatInputModule, MatSelectModule, MatButtonToggleModule, MatSlideToggleModule,
    GaugeModule.forRoot()
  ],
  providers: [StatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
