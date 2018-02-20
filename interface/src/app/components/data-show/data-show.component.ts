import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status.service';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-data-show',
  templateUrl: './data-show.component.html',
  styleUrls: ['./data-show.component.css']
})
export class DataShowComponent implements OnInit {
  socket;
  data: any;
  show: String;
  speakerStatus = true;
  constructor(private statusService: StatusService) {
    this.socket = io('http://35.154.179.244:8888/ws');
    this.socket.on('data', msg => {
      this.data = msg;
      this.show = JSON.stringify(msg);
      this.speakerStatus = this.data.cpu.speakerStatus;
      console.log(this.show);
    });
    this.socket.on('setSpeakers', msg => {
      this.speakerStatus = msg.status;
    });
  }

  ngOnInit() {
    this.statusService.getData().subscribe(data => {
      this.data = data.msg;
      this.show = JSON.stringify(data.msg);
      this.speakerStatus = this.data.cpu.speakerStatus;
      console.log(this.show);
    });
  }
  onSpeakerClick() {
    this.speakerStatus = !this.speakerStatus;
    const sStatus = {
      status: this.speakerStatus
    };
    this.statusService.setSpeakers(sStatus).subscribe(data => {
      console.log(data);
    });
  }
}
