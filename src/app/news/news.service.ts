import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vaccines } from './models/vaccines.model';
import { Cases } from './models/cases.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly BASE_URL = `https://europe-central2-webuni-js-covid-exam.cloudfunctions.net`;
  constructor(private readonly http: HttpClient) {}

  listCases(country: String) {
    return this.http.get<Cases>(`${this.BASE_URL}/cases?country=${country}`);
  }
  listVaccines(country: String) {
    return this.http.get<Vaccines>(
      `${this.BASE_URL}/vaccines?country=${country}`
    );
  }
}
