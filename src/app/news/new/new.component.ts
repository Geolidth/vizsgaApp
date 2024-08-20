import { Component, DestroyRef, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Vaccines } from '../models/vaccines.model';
import { Cases } from '../models/cases.model';
import { NewsService } from '../news.service';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    RouterLink,
    MatTabsModule,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {
  @Input({ required: true }) country?: String;
  vaccines?: Vaccines;
  cases?: Cases;
  constructor(
    private readonly newsService: NewsService,
    private readonly destroyeRef: DestroyRef
  ) {}
  ngOnInit() {
    this.listCases(this.country).subscribe();
    this.listVaccines(this.country).subscribe();
  }

  listCases(country?: String) {
    return this.newsService.listCases(country!).pipe(
      tap((news) => (this.cases = news)),
      takeUntilDestroyed(this.destroyeRef)
    );
  }
  listVaccines(country?: String) {
    return this.newsService.listVaccines(country!).pipe(
      tap((news) => (this.vaccines = news)),
      takeUntilDestroyed(this.destroyeRef)
    );
  }
}
