import { Component, inject } from '@angular/core';
import { OfferService } from './data-access/offer.service';
import { OfferCardComponent } from './ui/offer-card.component';
import { Offer } from './model/Offer';

type InitialState = {
  state: 'INITIAL';
};
type FoundState = {
  state: 'FOUND';
  offer: Offer;
};
type ErrorState = {
  state: 'ERROR';
  errorMessage: string;
};

export type FindOfferState = InitialState | FoundState | ErrorState;
@Component({
  selector: 'app-find-offer.page',
  standalone: true,
  imports: [OfferCardComponent],
  template: `
    <section class="pt-10 min-w-">
      <p class="text-2xl font-bold text-black dark:text-white pb-8 text-center">
        Find offer by ID
      </p>
      <div class="relative max-w-md mx-auto">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          #id
          type="text"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Offer ID"
          required
          (keyup.enter)="findOfferById(id)"
        />
        <button
          (click)="findOfferById(id)"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      @if (findOfferState.state === 'FOUND') {
        <p class="text-2xl font-bold text-black dark:text-white pt-8 pb-2 text-center">
          Found offer:
        </p>

        <app-offer-card
          [offer]="findOfferState.offer"
          class="w-full flex justify-center"
        ></app-offer-card>
      } @else if (findOfferState.state === 'ERROR') {
        <p class="text-2xl font-bold text-black dark:text-white pt-8 pb-2 text-center">
          {{ findOfferState.errorMessage }}
        </p>
      }
    </section>
  `,
  styles: ``,
})
export class FindOfferPageComponent {
  private offerService = inject(OfferService);
  findOfferState: FindOfferState = { state: 'INITIAL' };
  findOfferById(id: HTMLInputElement) {
    this.offerService.getOfferById(id.value).subscribe({
      next: (foundOffer) => {
        this.findOfferState = {
          state: 'FOUND',
          offer: foundOffer,
        };
      },
      error: (err) => {
        this.findOfferState = {
          state: 'ERROR',
          errorMessage: err.error.message,
        };
      },
    });
  }
}
