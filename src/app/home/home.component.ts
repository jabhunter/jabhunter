import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location, locationAttributesMapping } from '../location.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  
  locations$: Observable<Location[]>;

  constructor(private googleSheetsDbService: GoogleSheetsDbService, private sanitizer:DomSanitizer) { 
    this.locations$ = this.googleSheetsDbService.getActive<Location>(
      environment.locations.spreadsheetId,
      environment.locations.worksheetId,
      locationAttributesMapping,
      "Active"
    );
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getSanitizedAddressUrl(url:string){
    let addressUrl = `https://www.google.com/maps/place/`
    return this.sanitizer.bypassSecurityTrustUrl(addressUrl);
  }

  ngOnInit(): void {
  }

  public executeSelectedChange = (event: any) => {
    console.log(event);
  }
}
