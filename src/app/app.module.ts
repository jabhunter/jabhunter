import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { HowToComponent } from './howto/howto.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ExternalLinkDirective } from './external-link.directive';

@NgModule({
  imports: [
    AngularFireAnalyticsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgxDocViewerModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    ExternalLinkDirective,
    HeaderComponent,
    HomeComponent,
    HowToComponent,
    FaqComponent,
    FooterComponent,
    SidenavListComponent,
    PageNotFoundComponent
  ],
  exports: [

  ],
  providers: [GoogleSheetsDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));