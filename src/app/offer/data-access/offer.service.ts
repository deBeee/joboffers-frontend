import { inject, Injectable } from '@angular/core';
import { OfferApiService } from './offer.api.service';
import { OffersStateService } from './offers.state.service';
import { tap } from 'rxjs';
import { OfferData } from '../add-offer.page.component';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private httpService = inject(OfferApiService);
  private stateService = inject(OffersStateService);

  getAllOffers() {
    return this.httpService.getAll().pipe(
      tap((response) => {
        this.stateService.setState(response.offers);
      }),
    );
  }

  getOfferById(id: string) {
    return this.httpService.getById(id);
  }

  addOffer(offerData: OfferData) {
    return this.httpService.add(offerData).pipe(
      tap((addedOffer) => {
        this.stateService.updateState(addedOffer);
      }),
    );
  }
}
