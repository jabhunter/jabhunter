import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { AppointmentsComponent } from './appointments/appointments.component'
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { HowToComponent } from './howto/howto.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RenameCovidComponent } from './renamecovid/renamecovid.component'


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'howto', component: HowToComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'renamecovid', component: RenameCovidComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
