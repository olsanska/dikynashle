import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {WebcamModule} from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent, FormatTimePipe} from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PromptComponent } from './prompt-component/prompt-component.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {PwaService} from "./pwa.service";
import {MatButtonModule} from "@angular/material/button";
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    FormatTimePipe,
    PromptComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    NoopAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  exports: [
    PromptComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    // {provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
