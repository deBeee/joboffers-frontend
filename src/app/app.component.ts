import { Component, effect, HostBinding, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { StorageService } from './util/storage.service';
export type User = {
  username: string;
};
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <nav class="bg-white border-gray-200 dark:bg-blue-500">
      <div
        class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4"
      >
        <a routerLink="/dashboard">
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >JobOffers</span
          >
        </a>
        <button
          class="flex transition-transform hover:scale-110 align-middle pl-20"
          (click)="darkMode.set(!darkMode())"
        >
          @if (!darkMode()) {
            <span class="material-icons">dark_mode</span>
          } @else {
            <span class="material-icons">light_mode</span>
          }
        </button>
        @if (!isLoggedIn()) {
          <div
            class="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse"
          >
            <a
              routerLink="/login"
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >Login</a
            >
            <a
              routerLink="/register"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-700 dark:hover:bg-blue-900 focus:outline-none dark:focus:ring-blue-800"
              >Sign up</a
            >
          </div>
        } @else {
          <div
            class="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse"
          >
            <a
              routerLink="/dashboard"
              class="text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-700 dark:hover:bg-blue-900 focus:outline-none dark:focus:ring-blue-800"
              >Dashboard</a
            >
            <a
              (click)="logout()"
              class="text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-700 dark:hover:bg-blue-900 focus:outline-none dark:focus:ring-blue-800"
              >Logout</a
            >
          </div>
        }
      </div>
    </nav>
    <main class="bg-gray-100 min-h-screen dark:bg-gray-900">
      <router-outlet />
    </main>
  `,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgIf],
})
export class AppComponent implements OnInit {
  username?: string;
  private storageService = inject(StorageService);
  private router = inject(Router);

  isLoggedIn = this.storageService.$loggedStateValue;

  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false'),
  );

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      const user = this.storageService.getUser();

      this.username = user!.username;
    }
  }

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  logout(): void {
    this.storageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
