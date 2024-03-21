import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { OfferCardComponent } from './ui/offer-card.component';
import { StorageService } from '../util/storage.service';
import { OfferService } from './data-access/offer.service';
import { RouterLink } from '@angular/router';
import { OffersStateService } from './data-access/offers.state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, CdkCopyToClipboard, OfferCardComponent, NgClass, NgIf, RouterLink],
  template: `
    <section *ngIf="isLoggedIn()">
      <div class="w-3/6 flex flex-col items-center px-6 py-8 mx-auto">
        <div class="inline-flex rounded-md shadow-sm mb-10" role="group">
          <button
            routerLink="/add"
            type="button"
            class="inline-flex items-center px-4 py-2 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <svg
              class="w-4 h-4 me-2 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h14m-7 7V5"
              />
            </svg>

            Add offer
          </button>
          <button
            routerLink="/find"
            type="button"
            class="inline-flex items-center px-4 py-2 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <svg
              class="w-4 h-4 me-2 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>

            Find offer by ID
          </button>
        </div>

        <p class="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          All offers
        </p>
        @for (offer of $offers(); track offer.id) {
          <app-offer-card
            class="w-full flex justify-center"
            [offer]="offer"
          ></app-offer-card>
        }
      </div>
    </section>
  `,
  styles: ``,
})
export class DashboardPageComponent implements OnInit {
  private storageService = inject(StorageService);
  private offerService = inject(OfferService);
  private offersStateService = inject(OffersStateService);

  isLoggedIn = this.storageService.$loggedStateValue;

  $offers = this.offersStateService.$offersStateValue;

  ngOnInit() {
    this.getAllOffers();
  }

  getAllOffers() {
    this.offerService.getAllOffers().subscribe({
      error: (err) => {
        alert(err);
      },
    });
  }
}
