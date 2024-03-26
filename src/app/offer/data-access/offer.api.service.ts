import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferData } from '../add-offer.page.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Offer } from '../models/offer';

export interface OfferListResponse {
  offers: Offer[];
}

@Injectable({
  providedIn: 'root',
})
export class OfferApiService {
  private URL = 'http://localhost:8080/offers';
  private http = inject(HttpClient);

  getAll(): Observable<OfferListResponse> {
    return this.http.get<OfferListResponse>(this.URL);
  }

  getById(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.URL}/${id}`);
  }

  add(offerData: OfferData): Observable<Offer> {
    return this.http.post<Offer>(this.URL, offerData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
