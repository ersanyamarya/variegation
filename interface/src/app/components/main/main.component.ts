import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  colorValue = "#333333"
  constructor() { }
  tiles = [{ cols: 3, rows: 1 }, { cols: 1, rows: 3 }, { cols: 1, rows: 2 }, { cols: 2, rows: 1 }, { cols: 2, rows: 1 }];
  ngOnInit() {
  }

}
