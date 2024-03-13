import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
export type JwtResponseDto = {
  username: string;
  token: string;
};
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <section class="bg-gray-50 dark:bg-gray-900">
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
              Sign in to your account
            </h1>
            <form
              [formGroup]="loginForm"
              (ngSubmit)="onSubmit()"
              class="space-y-4 md:space-y-6 "
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
                  id="username"
                  name="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  formControlName="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <a
                  routerLink="/register"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign up</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class LoginPageComponent {
  private URL = 'http://localhost:8080';
  private formBuilder = inject(NonNullableFormBuilder);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });
  private token = '';
  onSubmit() {
    this.httpClient
      .post<JwtResponseDto>(`${this.URL}/token`, this.loginForm.getRawValue())
      .subscribe({
        next: (response) => {
          //this.token = response.token;
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
  }
}