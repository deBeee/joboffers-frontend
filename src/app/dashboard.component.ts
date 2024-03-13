import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Offer = {
  id: string;
  title: string;
  company: string;
  salary: string;
  url: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <section class="bg-gray-50 dark:bg-gray-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <p
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Available offers
        </p>
        <div
          class="w-full bg-white rounded-lg shadows dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          @for (offer of offers; track offer.id) {
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p>{{ offer.title }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class DashboardComponent implements OnInit {
  private httpClient = inject(HttpClient);
  offers: Offer[] = [];
  ngOnInit() {
    this.getAllOffers();
  }

  getAllOffers() {
    //debugger;
    this.httpClient
      .get<Offer[]>('http://localhost:8080/offers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.offers = response;
        },
        error: (err) => {
          console.log(err);
          alert(err);
        },
      });
  }
}
