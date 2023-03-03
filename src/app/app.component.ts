import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResponseService } from './Services/response.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private responseService: ResponseService) {}

  date: string;
  dateValue = new FormControl();

  public response: any = [];
  public citiesList: any;

  private originCode: string;
  private distinctionCode: string;

  ngOnInit(): void {
    this.getCityList();
  }

  Show() {
    this.responseService.qs.push(['origin', this.originCode]);
    this.responseService.qs.push(['destination', this.distinctionCode]);
    this.responseService.qs.push(['date', this.date]);
    this.responseService.getResponse().subscribe((res) => {
      this.response.push(res);
      console.log(this.response);
    });
  }

  getCityList() {
    this.responseService.getCitiesList().subscribe((res) => {
      this.citiesList = res;
    });
  }

  getOriginCode(data: any) {
    this.originCode = data.target.value;
  }

  getDistinctionCode(data: any) {
    this.distinctionCode = data.target.value;
  }
}
