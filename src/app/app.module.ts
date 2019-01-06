import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './team/team.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostComponent } from './post/post.component';
import { routing } from './routes';
import {LoginService} from './login.service';
import {BrowserXhr, HttpModule} from '@angular/http';
import { UploadComponent } from './upload/upload.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FormsModule } from '@angular/forms';
import {FacebookModule, FacebookService} from 'ngx-facebook';
import { PostdetailComponent } from './postdetail/postdetail.component';
import {ListpostService} from './listpost.service';
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import {FileUploadModule} from 'ng2-file-upload';
import {RlTagInputModule} from 'angular2-tag-input/dist';
import {HttpClientModule} from '@angular/common/http';
import {NgProgressBrowserXhr, NgProgressModule} from 'ngx-progressbar';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TeamComponent,
    ProfilesComponent,
    HeaderComponent,
    FooterComponent,
    PostComponent,
    UploadComponent,
    EditprofileComponent,
    PostdetailComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    routing,
    FacebookModule.forRoot(),
    Ng2CloudinaryModule,
    FileUploadModule,
    RlTagInputModule,
    NgProgressModule
  ],
  providers: [LoginService, FacebookService, ListpostService, { provide: BrowserXhr, useClass: NgProgressBrowserXhr }],
  bootstrap: [AppComponent]
})
export class AppModule { }
