import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { NewComponent } from '../new/new.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    RouterLink,
    MatTabsModule,
    NewComponent,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent {
  selectedCountry = '';
  countries = ['france', 'slovakia', 'slovenia', 'austria', 'romania'];
  countryArray = ['hungary'];
  buttontext = signal('Kiválaszt');
  constructor() {
    this.selectedCountry = this.countries[0];
  }

  addCountry() {
    for (let index = 0; index < this.countries.length; index++) {
      if (this.countries[index] === this.selectedCountry) {
        this.countries.splice(index, 1);
      }
    }
    this.selectedCountry = this.countries[0];
    this.countryArray.push(this.selectedCountry);
  }
}
