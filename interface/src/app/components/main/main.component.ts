import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  redValue = 51;
  greenValue = 51;
  blueValue = 51;
  whiteValue = 0;
  yellowValue = 0;
  lightMode = 'partyMode';
  autoSync = false;
  colorValue = '#333333';
  constructor() {}
  // tiles = [{ cols: 3, rows: 1 }, { cols: 1, rows: 3 }, { cols: 1, rows: 2 }, { cols: 2, rows: 1 }, { cols: 2, rows: 1 }];
  ngOnInit() {}
  onColorPickerChange() {
    const COLORS = this.hexToRgb(this.colorValue);
    this.redValue = COLORS.r;
    this.blueValue = COLORS.b;
    this.greenValue = COLORS.g;
    this.whiteValue = 0;
    this.yellowValue = 0;
    this.lightMode = 'colorMyRoom';
  }
  onRGBSliderChange() {
    if (this.redValue > 255) this.redValue = 255;
    if (this.greenValue > 255) this.greenValue = 255;
    if (this.blueValue > 255) this.blueValue = 255;
    if (this.whiteValue > 255) this.whiteValue = 255;
    if (this.yellowValue > 255) this.yellowValue = 255;

    this.colorValue = this.rgbToHex(
      Number(this.redValue),
      Number(this.greenValue),
      Number(this.blueValue)
    );
  }
  onModeCHange() {
    if (this.lightMode === 'readMode') {
      this.redValue = 0;
      this.greenValue = 0;
      this.blueValue = 0;
      this.whiteValue = 120;
      this.yellowValue = 255;
      this.onRGBSliderChange();
    }
  }
  rgbToHex(r: Number, g: Number, b: Number) {
    return (
      '#' +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }
  componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }
}
