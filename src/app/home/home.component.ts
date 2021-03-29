import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location, locationAttributesMapping } from '../location.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locations$: Observable<Location[]>;

  constructor(private googleSheetsDbService: GoogleSheetsDbService) { 
    this.locations$ = this.googleSheetsDbService.getActive<Location>(
      environment.locations.spreadsheetId,
      environment.locations.worksheetId,
      locationAttributesMapping,
      "Active"
    );
  }

  ngOnInit(): void {
  }

  public executeSelectedChange = (event: any) => {
    console.log(event);
  }
}
