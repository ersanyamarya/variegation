import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
  MatSidenavModule, MatMenuModule, MatCardModule, MatListModule, MatGridListModule,
  MatSliderModule, MatInputModule,MatSelectModule} from '@angular/material';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule,
    FormsModule, HttpModule
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
    MatSidenavModule, MatMenuModule, MatCardModule, MatListModule,
    MatGridListModule, MatSliderModule, MatInputModule,MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
