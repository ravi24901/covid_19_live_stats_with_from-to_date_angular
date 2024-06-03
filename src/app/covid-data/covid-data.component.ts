import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-covid-data',
  templateUrl: './covid-data.component.html',
  styleUrls: ['./covid-data.component.css']
})
export class CovidDataComponent implements OnInit {
  covidData: any[] = [];
  selectedState: string = 'az';
  filteredCovidData: any[] = [];
  fromDate = '';
  toDate = '';
  
  constructor(private covidService: CovidService) { }

  ngOnInit(): void {
    // No initial data fetch
  }

  getInfo(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.covidService.getDailyData(this.selectedState).subscribe(data => {
      this.covidData = data;
      this.filterData();
    });
  }

  onStateChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedState = target.value;
  }

  formatDate(dateString: any): string {
    const dateStr = dateString.toString();
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${month}-${day}-${year}`;
  }

  editInputDate(dateString: any): Number {
    return parseInt(dateString.slice(0,4)) * 10000 + parseInt(dateString.slice(5,7)) * 100 + parseInt(dateString.slice(8,10));
  }

  onDateChange(event: any): void {
    if (event.target.id === 'fromDate') {
      this.fromDate = event.target.value;
    } else if (event.target.id === 'toDate') {
      this.toDate = event.target.value;
    }
  }

  filterData(): void {
    if (this.fromDate && this.toDate && this.selectedState) {
      const from = this.editInputDate(this.fromDate);
      const to = this.editInputDate(this.toDate);

      this.filteredCovidData = this.covidData.filter(day => {
        const date = new Number(day.date);
        return date >= from && date <= to;
      });
    } else {
      this.filteredCovidData = [];
    }
  }
}
