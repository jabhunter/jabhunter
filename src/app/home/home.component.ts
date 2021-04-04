import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location, locationAttributesMapping } from '../location.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;

  locations$: Observable<Location[]>;

  displayedColumns: any;
  dataSource: any;
  subscriptions: Subscription[] = [];
  testArray: any;
  filterValue: any;
  spreadsheetId: any;
  worksheetId: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  locations: any;

  constructor(private googleSheetsDbService: GoogleSheetsDbService, private sanitizer: DomSanitizer) {
    this.spreadsheetId = environment.locations.spreadsheetId
    this.worksheetId = environment.locations.worksheetId
    this.displayedColumns = environment.table.columns;

    this.locations$ = this.googleSheetsDbService.getActive<Location>(
      this.spreadsheetId,
      this.worksheetId,
      locationAttributesMapping,
      "Active"
    );
  }

  ngOnInit(): void {
    this.getSubscriptions();
    console.log(this.locations$);
  }

  getSubscriptions(): void {
    this.subscriptions = [
      this.locations$.subscribe(res => {
        console.log(res);
        this.locations = res;
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    ]
  }

  changeData(locations: Location[]): any {


  }

  applyFilter(event: any) {
    this.filterValue = event.target.value
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }
}
