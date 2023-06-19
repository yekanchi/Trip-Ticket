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
  isSearching = false;
  interval: any;
  timeNumbers: number[];
  originName: string;
  destinationName: string;
  shownseats: any;

  public response: Items[] = [];
  public citiesList: any;

  constructor(private cityService: CityService) {
    this.timeNumbers = [];
    for (let n = 8; n <= 23; n++) {
      this.timeNumbers.push(n);
    }
  }

  TicketForm = new FormGroup({
    origin: new FormControl(),
    destination: new FormControl(),
    date: new FormControl(),
    timeFrom: new FormControl(),
    timeTo: new FormControl(),
  });

  ngOnInit(): void {
    this.getCityList();
  }

  playAudio() {
    var audio = new Audio();
    audio.src = '/assets/audio/Alarm.mp3';
    audio.load();
    audio.play();
  }

  ShowAvailSeat() {
    this.interval = setInterval(() => {
      this.cityService
        .getCityUrl(
          this.TicketForm.value.origin,
          this.TicketForm.value.destination,
          this.TicketForm.value.date
        )
        .subscribe((res) => {
          this.isSearching = true;
          this.response.length = 0;

          this.originName = res.OriginEnglishName;
          this.destinationName = res.DestinationEnglishName;

          for (const i of res.Items) {
            var timeString = new Date('2023-01-01T' + i.DepartureTime);

            const departureHour = timeString.getHours();
            if (
              departureHour >= this.TicketForm.value.timeFrom &&
              departureHour <= this.TicketForm.value.timeTo
            ) {
              this.response.push(i);
              console.log(this.response);

              this.response.forEach((e) => {
                if (e.AvailableSeatCount > 0) {
                  this.playAudio();
                }
              });
            }
          }
        });
    }, 5000);
  }

  StopSearching() {

    clearInterval(this.interval);
    this.isSearching = false;
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

  GoToService(serviceID: number) {
    window.open(
      `https://safar724.com/checkout/${this.TicketForm.value.origin}/${this.originName}/${this.TicketForm.value.destination}/${this.destinationName}/${this.TicketForm.value.date}/${serviceID}-${this.TicketForm.value.destination}#step-reserve`,
      '_blanke'
    );
  }
}
