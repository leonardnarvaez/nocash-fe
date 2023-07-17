import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthStateService } from './shared/auth-state.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ErrorHandlerInterceptorService } from './services/error-handler-interceptor.service';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    CreditCardDirectivesModule,
    MatPaginatorModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthStateService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptorService, multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
