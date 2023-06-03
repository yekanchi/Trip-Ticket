import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Items } from 'src/app/Domains/api.model';
import { CityService } from 'src/app/Services/city.service';

@Component({
  selector: 'app-show-available-seats',
  templateUrl: './show-available-seats.component.html',
  styleUrls: ['./show-available-seats.component.css'],
})
export class ShowAvailableSeatsComponent implements OnInit {
  constructor(private cityService: CityService) {}
  isSearching = false;

  TicketForm = new FormGroup({
    origin: new FormControl(),
    destination: new FormControl(),
    date: new FormControl(),
  });

  public response: Items[];
  public citiesList: any;

  ngOnInit(): void {
    this.getCityList();
  }

  playAudio() {
    var audio = new Audio();
    audio.src = '/assets/audio/Alarm.mp3';
    audio.load();
    audio.play();
    setTimeout(function () {
      audio.pause();
      audio.currentTime = 0;
    }, 5000);
  }

  ShowAvailSeat() {
    this.response = [];
    setInterval(() => {
      this.cityService
        .getCityUrl(
          this.TicketForm.value.origin,
          this.TicketForm.value.destination,
          this.TicketForm.value.date
        )
        .subscribe((res) => {
          this.isSearching = true;
          console.log(res);
          this.response = res.Items;
          for (const i of this.response) {
            if (i.AvailableSeatCount > 0) {
              this.playAudio();
            }
          }
        });
    }, 20000);
  }

  getCityList() {
    this.cityService.getCitiesList().subscribe((res) => {
      this.citiesList = res;
    });
  }

  getOriginCode(data: any) {
    this.TicketForm.value.origin = data.target.value;
  }

  getDestinationCode(data: any) {
    this.TicketForm.value.destination = data.target.value;
  }
}
