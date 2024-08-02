import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsComponent } from './features/buttons/buttons.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginFormComponent } from './features/login-form/login-form.component';
import { WelcomeContentComponent } from './features/welcome-content/welcome-content.component';
import { WelcomeAuthContentComponent } from './features/auth-content/auth-content.component';
import { ContentComponent } from './features/content/content.component';
import { ErrorHandlingComponent } from './common/error-handling/error-handling.component';

import { AxiosService } from './service/axios.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    HeaderComponent,
    LoginFormComponent,
    WelcomeAuthContentComponent,
    WelcomeContentComponent,
    ContentComponent,
    ErrorHandlingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: EncryptionInterceptorService,
    //   multi: true,
    // },
    AxiosService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
