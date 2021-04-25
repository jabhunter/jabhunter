import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location, locationAttributesMapping } from '../location.model';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss']
})
export class DetailViewComponent implements OnInit {
    panelOpenState = false;
  
    locations$: Observable<Location[]>;
    JabId : string;
    // constructor(private googleSheetsDbService: GoogleSheetsDbService, private sanitizer:DomSanitizer) { 
    //   this.locations$ = this.googleSheetsDbService.getActive<Location>(
    //     environment.locations.spreadsheetId,
    //     environment.locations.worksheetId,
    //     locationAttributesMapping,
    //     "Active"
    //   );
    // }
    constructor(private googleSheetsDbService: GoogleSheetsDbService, private sanitizer:DomSanitizer) { 
        this.locations$ = this.googleSheetsDbService.get<Location>(
          environment.locations.spreadsheetId,
          environment.locations.worksheetId,
          locationAttributesMapping,
        );
         
        let searchParams = new URLSearchParams(window.location.search)
        this.JabId = searchParams.get('JabId') as any
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


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/