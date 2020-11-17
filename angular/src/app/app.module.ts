import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './_app/app.component';
import { InboxComponent } from './inbox/inbox.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageAccessComponent } from './page-access/page-access.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { SecondaryHeaderComponent } from './secondary-header/secondary-header.component';
import { PageMessagesComponent } from './page-messages/page-messages.component';
import { FilterTasksPipe } from './filter-tasks.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    MailDetailComponent,
    CalendarComponent,
    UserProfileComponent,
    HeaderComponent,
    PageHomeComponent,
    PageAccessComponent,
    LoginComponent,
    RegisterComponent,
    PageSettingsComponent,
    SecondaryHeaderComponent,
    PageMessagesComponent,
    FilterTasksPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
