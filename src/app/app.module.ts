import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppService} from './app.service';
import {HttpClientModule} from '@angular/common/http';
import { IssueComponent } from './issue/issue.component';
import { IssuesComponent } from './issues/issues.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IssueComponent,
    IssuesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent}])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
