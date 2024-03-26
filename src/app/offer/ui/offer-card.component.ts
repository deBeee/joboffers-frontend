import { Component, Input } from '@angular/core';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { NgClass } from '@angular/common';

import { Offer } from '../models/offer';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [CdkCopyToClipboard, NgClass],
  template: `
    <div
      class="w-full max-w-lg bg-white rounded-lg shadows dark:border md:mt-0 p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white mb-3 text-center"
    >
      <p><b>Position: </b>{{ offer.title }}</p>
      <p><b>Company: </b>{{ offer.company }}</p>
      <p><b>Salary: </b>{{ offer.salary }}</p>
      <p>
        <b>URL: </b><a href="{{ offer.url }}">{{ offer.url }}</a>
      </p>
      <p class="flex justify-center items-center relative">
        <b class="mr-1">ID: </b>{{ offer.id }}
        <span
          class="inline-block ml-3 hover:cursor-pointer"
          [cdkCopyToClipboard]="offer.id"
          (click)="showTooltip()"
        >
          @if (!copiedFlag) {
            <svg
              (click)="switchCopiedFlag()"
              class="w-[16px] h-[16px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                clip-rule="evenodd"
              />
            </svg>
          } @else {
            <svg
              (click)="switchCopiedFlag()"
              class="w-[16px] h-[16px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                clip-rule="evenodd"
              />
            </svg>
          }
        </span>
        <span
          id="tooltip"
          [ngClass]="{ hidden: !tooltipVisible }"
          class="bg-gray-800 text-sm text-white px-0.5 py-0.5 rounded-md absolute right-14"
        >
          Copied!
        </span>
      </p>
    </div>
  `,
  styles: ``,
})
export class OfferCardComponent {
  @Input({ required: true }) offer!: Offer;
  copiedFlag = false;

  tooltipVisible: boolean = false;

  showTooltip() {
    this.tooltipVisible = true;
    setTimeout(() => {
      this.tooltipVisible = false;
    }, 1000);
  }

  switchCopiedFlag() {
    this.copiedFlag = true;
    setTimeout(() => {
      this.copiedFlag = false;
    }, 1000);
  }
}
