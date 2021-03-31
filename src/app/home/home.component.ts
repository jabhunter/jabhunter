import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location, locationAttributesMapping } from '../location.model';
import { DomSanitizer } from '@angular/platform-browser';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';

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

  someEvent = (e: MouseEvent) => {
    console.log(e)
  };

  showTheObj = (objToShow: object) => {
    if (objToShow) {
      console.log(objToShow);
        this.objToShow.emit(this.item);
        this.displayNone = this.displayNone ? '' : 'none';
        this.lineThrough = this.lineThrough ? '' : 'line-through';
      }
      const coolLocations = objToShow.pipe
    } else {
      console.log("nothing to show")
    }
  }

  

  public executeSelectedChange = (event: any, locations: object) => {
    console.log(event);

    console.log(locations);
  }
}

// This component makes a request but it can't actually delete a hero.
@Output() deleteRequest = new EventEmitter<Item>();

delete() {
  this.deleteRequest.emit(this.item);
  this.displayNone = this.displayNone ? '' : 'none';
  this.lineThrough = this.lineThrough ? '' : 'line-through';
}
