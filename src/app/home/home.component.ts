import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location, locationAttributesMapping } from '../location.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState: boolean;
  displayNone: string;
  lineThrough: string;
  spreadsheetId: string;
  worksheetId: number;
  address: string;
  googleMap: string;
  state: string;
  city: string;
  streetNumber: string;
  street: string;
  subscriptions: Subscription[] = [];
  testArray: any;

  locations$: Observable<Location[]>;
  // This component makes a request but it can't actually delete a hero.
  @Output()
  public sendData: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public deleteRequest: EventEmitter<any> = new EventEmitter<any>();

  constructor(private googleSheetsDbService: GoogleSheetsDbService, private sanitizer: DomSanitizer) {
    this.panelOpenState = false;
    this.displayNone = "";
    this.lineThrough = "";
    this.address = ""
    this.state = "CA"
    this.city = ""
    this.streetNumber = ""
    this.street = ""
    this.address = ""
    this.googleMap = "https://www.google.com/maps/place/"
    this.spreadsheetId = environment.locations.spreadsheetId;
    this.worksheetId = environment.locations.worksheetId;

    this.locations$ = this.googleSheetsDbService.getActive<Location>(
      this.spreadsheetId,
      this.worksheetId,
      locationAttributesMapping,
      "Active"
    );

    this.subscriptions = [
      this.testArray = this.locations$.subscribe(res => console.log(res))
    ]
    console.log(this.testArray);
    // this.testArray.filter()

  }

  ngOnInit(): void {
  }

  filterByZip(event: any): any {
    console.log("filterByZip");
    const selectedZip = event.value
    // this.testArray.filter(f => f.address.zip == selectedZip)
    // switch 
    // address // date // 
  }

  buildAddress(): void {
    this.address = `${this.googleMap} ${this.streetNumber} ${this.street} ${this.city} ${this.state}`
  }

  item(item: any): void {
    throw new Error('Method not implemented.');
  }

  sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getSanitizedAddressUrl(url: string): SafeUrl {
    let addressUrl = `https://www.google.com/maps/place/`
    return this.sanitizer.bypassSecurityTrustUrl(addressUrl);
  }

  someEvent = (e: MouseEvent) => {
    console.log(e)
  };

  showTheObj = (objToShow: object) => {
    if (objToShow) {
      console.log(objToShow);
      this.sendData.emit(this.item);
      this.displayNone = this.displayNone ? '' : 'none';
      this.lineThrough = this.lineThrough ? '' : 'line-through';
    } else {
      console.log("nothing to show")
    }
  }



  executeSelectedChange(event: any, locations: object): void {
    console.log(event);

    console.log(locations);
  }

  // deleteRequestFunction(): void {
  //   this.deleteRequest.emit(this.item);
  //   this.displayNone = this.displayNone ? '' : 'none';
  //   this.lineThrough = this.lineThrough ? '' : 'line-through';
  // }
}
