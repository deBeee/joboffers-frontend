import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { NgIf } from '@angular/common';

export type RegistrationResultDto = {
  userId: string;
  username: string;
  isCreated: boolean;
};
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  template: `
    <section>
      @if (!showSuccessMesssage) {
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        >
          <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
              >
                Create an account
              </h1>
              <form
                [formGroup]="registerForm"
                (ngSubmit)="onSubmit()"
                class="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Username</label
                  >
                  <input
                    type="text"
                    formControlName="username"
                    name="username"
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required
                  />
                  <span
                    class="mt-2 text-xs text-red-600 dark:text-red-500"
                    *ngIf="
                      submitted && registerForm.controls.username.errors?.['required']
                    "
                  >
                    required
                  </span>
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Password</label
                  >
                  <input
                    type="password"
                    name="password"
                    formControlName="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <span
                    class="mt-2 text-xs text-red-600 dark:text-red-500"
                    *ngIf="
                      submitted && registerForm.controls.password.errors?.['required']
                    "
                  >
                    required
                  </span>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <a
                    routerLink="/login"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >Login here</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      } @else {
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        >
          <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div
              class="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
            >
              <div
                class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5"
              >
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Successfully created account.
              </p>
              <button
                (click)="navigateToLoginPage()"
                class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: ``,
})
export class RegisterPageComponent {
  showSuccessMesssage = false;
  private formBuilder = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.getRawValue();
      this.authService.register(username, password).subscribe({
        next: (response) => {
          if (response.isCreated) {
            this.showSuccessMesssage = true;
          }
        },
        error: (err) => {
          console.log(err);
          alert(err.error.messages);
        },
      });
    }
  }

  navigateToLoginPage() {
    this.showSuccessMesssage = false;
    this.router.navigateByUrl('/login');
  }
}
