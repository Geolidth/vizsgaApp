import { Routes } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { ChartComponent } from './chart/chart.component';

export const routes: Routes = [
  { path: '', component: NewsListComponent },
  { path: 'chart', component: ChartComponent },
];
