import { Injectable, signal } from '@angular/core';

import { Offer } from '../models/offer';

const initialState = [] as Offer[];

@Injectable({
  providedIn: 'root',
})
export class OffersStateService {
  private state = signal(initialState);

  $offersStateValue = this.state.asReadonly();

  setState(offers: Offer[]) {
    this.state.set(offers);
  }

  updateState(offer: Offer) {
    this.state.update((state) => {
      console.log(this.$offersStateValue());
      return [...state, offer];
    });
  }
}
