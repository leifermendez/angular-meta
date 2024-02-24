import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { GlobalService } from './services/global.service';

export const appConfig: ApplicationConfig = {
  providers: [
    GlobalService,
    provideFileRouter(),
    provideHttpClient(),
    provideClientHydration(),
  ],
};
