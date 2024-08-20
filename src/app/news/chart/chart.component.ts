import { Component, DestroyRef, Input, signal } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NewComponent } from '../new/new.component';
import { NewsService } from '../news.service';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cases } from '../models/cases.model';
import { Vaccines } from '../models/vaccines.model';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    HighchartsChartModule,
    MatButtonModule,
    NewComponent,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  buttonText = signal('Kiválaszt');
  case?: Cases;
  vaccine?: Vaccines;
  countries = [
    'hungary',
    'france',
    'slovakia',
    'slovenia',
    'austria',
    'romania',
  ];
  country = '';
  population = this.vaccine?.population;
  constructor(
    private readonly newsService: NewsService,
    private readonly destroyeRef: DestroyRef
  ) {
    this.country = this.countries[0];
    this.loadCase(this.country).subscribe();
    this.loadVaccine(this.country).subscribe();
  }
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  chooseCountry() {
    this.loadCase(this.country).subscribe();
    this.loadVaccine(this.country).subscribe();
  }

  loadCase(country?: string) {
    return this.newsService.listCases(country!).pipe(
      tap((news) => {
        this.case = news;
        this.setChart();
      }),
      takeUntilDestroyed(this.destroyeRef)
    );
  }

  loadVaccine(country?: string) {
    return this.newsService.listVaccines(country!).pipe(
      tap((news) => {
        this.vaccine = news;
        this.setChart();
      }),
      takeUntilDestroyed(this.destroyeRef)
    );
  }

  setChart() {
    this.chartOptions = {
      title: {
        text: 'Covid oltási és fertőzési adatok',
      },
      subtitle: {
        text: `${this.vaccine?.country}, lakosság: ${this.vaccine?.population} fő, várható élettartam: ${this.vaccine?.life_expectancy} év`,
        align: 'center',
      },

      series: [
        {
          data: [
            { name: 'Beadott vakcinák', y: this.vaccine?.administered },
            { name: 'Beoltott emberek', y: this.vaccine?.people_vaccinated },
            { name: 'Megerősített fertőzések', y: this.case?.confirmed },
            { name: `Halálozások: ${this.case?.deaths}`, y: this.case?.deaths },
          ],
          type: 'pie',
          name: 'Fő',
        },
      ],
    };
  }
}
