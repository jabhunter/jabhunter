import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { ExternalLinkDirective } from './external-link.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//components
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { HowToComponent } from './howto/howto.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RenameCovidComponent } from './renamecovid/renamecovid.component'
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CdkDetailRowDirective } from './home/cdk-detail-row.directive';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
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
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    AppointmentsComponent,
    ExternalLinkDirective,
    HeaderComponent,
    HomeComponent,
    HowToComponent,
    FaqComponent,
    FooterComponent,
    SidenavListComponent,
    PageNotFoundComponent,
    RenameCovidComponent,
    CdkDetailRowDirective
  ],
  exports: [
    CdkTableModule,
    CdkTreeModule,
  ],
  providers: [GoogleSheetsDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
