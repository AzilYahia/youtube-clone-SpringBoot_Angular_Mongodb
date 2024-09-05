import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import { authConfig } from './auth/auth.config';
import {AuthInterceptor, provideAuth} from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient(), provideAuth(authConfig), {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],

};
