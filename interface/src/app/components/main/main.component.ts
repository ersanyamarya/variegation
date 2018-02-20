import { Component, OnInit } from "@angular/core";
import { StatusService } from "../../services/status.service";
import { stagger } from "@angular/animations/src/animation_metadata";
import * as io from "socket.io-client";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  redValue = 51;
  greenValue = 51;
  blueValue = 51;
  whiteValue = 0;
  yellowValue = 0;
  lightMode = "PARTYMODE";
  autoSync = false;
  colorValue = "#333333";
  socket;
  constructor(private statusService: StatusService) {
    this.socket = io('http://35.154.179.244:8888/ws');
    this.socket.on('status', msg => {
      this.redValue = msg.led.red;
      this.greenValue = msg.led.green;
      this.blueValue = msg.led.blue;
      this.whiteValue = msg.led.white;
      this.yellowValue = msg.led.yellow;
      this.lightMode = msg.mode;
      this.setColorsOnUi();
    });
  }
  ngOnInit() {
    this.statusService.getStatus().subscribe(data => {
      if (data.success) {
        this.redValue = data.msg.led.red;
        this.greenValue = data.msg.led.green;
        this.blueValue = data.msg.led.blue;
        this.whiteValue = data.msg.led.white;
        this.yellowValue = data.msg.led.yellow;
        this.lightMode = data.msg.mode;
        this.setColorsOnUi();
        this.onModeCHange();
      }
      console.log(data);
    });
  }
  onColorPickerChange() {
    this.whiteValue = 0;
    this.yellowValue = 0;
    const COLORS = this.hexToRgb(this.colorValue);
    this.redValue = COLORS.r;
    this.blueValue = COLORS.b;
    this.greenValue = COLORS.g;

    if (this.lightMode === 'READMODE') {
      this.lightMode = 'COLORMYROOM';
    }
    if (this.autoSync) this.setStatus();
  }
  onRGBSliderChange() {
    if (this.redValue > 255) this.redValue = 255;
    if (this.greenValue > 255) this.greenValue = 255;
    if (this.blueValue > 255) this.blueValue = 255;
    if (this.whiteValue > 255) this.whiteValue = 255;
    if (this.yellowValue > 255) this.yellowValue = 255;
    if (this.lightMode === 'READMODE') {
      this.whiteValue = 0;
      this.yellowValue = 0;
      this.lightMode = 'COLORMYROOM';
    }
    this.setColorsOnUi();
    if (this.autoSync) this.setStatus();
  }
  onModeCHange() {
    if (this.lightMode === 'READMODE') {
      this.redValue = 0;
      this.greenValue = 0;
      this.blueValue = 0;
      this.whiteValue = 120;
      this.yellowValue = 255;
      this.setColorsOnUi();
    } else if (this.lightMode === 'PARTYMODE') {
      this.redValue = 51;
      this.greenValue = 51;
      this.blueValue = 51;
      this.whiteValue = 0;
      this.yellowValue = 0;
      this.setColorsOnUi();
    }
    if (this.autoSync) this.setStatus();
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
  setColorsOnUi() {
    this.colorValue = this.rgbToHex(
      Number(this.redValue),
      Number(this.greenValue),
      Number(this.blueValue)
    );
  }
  setStatus() {
    const status = {
      led: {
        red: this.redValue,
        green: this.greenValue,
        blue: this.blueValue,
        white: this.whiteValue,
        yellow: this.yellowValue
      },
      mode: this.lightMode
    };
    this.statusService.setStatus(status).subscribe(data => {
      if (data.success) {
        console.log(status);
      }
    });
  }
}
