import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './_app/app.component';
import { InboxComponent } from './inbox/inbox.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    MailDetailComponent,
    CalendarComponent,
    UserProfileComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
