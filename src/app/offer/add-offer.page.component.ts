import { Component, inject } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfferService } from './data-access/offer.service';
import { RouterLink } from '@angular/router';
import { Offer } from './model/Offer';
import { OfferCardComponent } from './ui/offer-card.component';

export type OfferData = {
  title: string;
  company: string;
  salary: string;
  url: string;
};
@Component({
  selector: 'app-add-offer.page',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink, JsonPipe, OfferCardComponent],
  template: ` <section class="flex flex-col items-center justify-center pt-10">
    <p class="text-2xl font-bold text-black dark:text-white pb-4">Add offer</p>
    <form [formGroup]="offerForm" (ngSubmit)="onSubmit()" class="min-w-96 mx-auto">
      <div class="relative z-0 w-full mb-4">
        <input
          formControlName="title"
          id="position"
          type="text"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="position"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Position</label
        >
        <span
          class="text-xs text-red-600 dark:text-red-500"
          *ngIf="submitted && offerForm.controls.title.errors?.['required']"
        >
          required
        </span>
      </div>
      <div class="relative z-0 w-full mb-4">
        <input
          formControlName="company"
          id="company"
          type="text"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="company"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Company</label
        >
        <span
          class="mt-2 text-xs text-red-600 dark:text-red-500"
          *ngIf="submitted && offerForm.controls.company.errors?.['required']"
        >
          required
        </span>
      </div>
      <div class="relative z-0 w-full mb-4">
        <input
          formControlName="salary"
          id="salary"
          type="text"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="salary"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Salary</label
        >
        <span
          class="mt-2 text-xs text-red-600 dark:text-red-500"
          *ngIf="submitted && offerForm.controls.salary.errors?.['required']"
        >
          required
        </span>
      </div>
      <div class="relative z-0 w-full mb-4">
        <input
          formControlName="url"
          id="url"
          type="text"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />

        <label
          for="url"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >URL</label
        >
        <span
          class="mt-2 text-xs text-red-600 dark:text-red-500"
          *ngIf="submitted && offerForm.controls.url.errors?.['required']"
        >
          required
        </span>
      </div>
      <div class="flex justify-between">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          routerLink="/dashboard"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Go back
        </button>
      </div>
    </form>
    @if (addedOffer) {
      <p class="text-2xl font-bold text-black dark:text-white pb-4 mt-6">
        Offer added successfully
      </p>
      <app-offer-card
        [offer]="addedOffer"
        class="w-3/6 flex justify-center"
      ></app-offer-card>
      <button
        routerLink="/dashboard"
        class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        See at dashboard
      </button>
    }
  </section>`,
  styles: ``,
})
export class AddOfferPageComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private offerService = inject(OfferService);

  offerForm = this.formBuilder.group({
    title: this.formBuilder.control('', [Validators.required]),
    company: this.formBuilder.control('', [Validators.required]),
    salary: this.formBuilder.control('', [Validators.required]),
    url: this.formBuilder.control('', [Validators.required]),
  });

  submitted: boolean = false;
  addedOffer?: Offer;
  onSubmit(): void {
    this.submitted = true;
    if (this.offerForm.valid) {
      const offerData: OfferData = this.offerForm.getRawValue();
      this.offerService.addOffer(offerData).subscribe({
        next: (addedOffer: Offer) => {
          this.addedOffer = addedOffer;
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
}
