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

  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private googleSheetsDbService: GoogleSheetsDbService, private sanitizer: DomSanitizer) {
    this.locations$ = this.googleSheetsDbService.getActive<Location>(
      environment.locations.spreadsheetId,
      environment.locations.worksheetId,
      locationAttributesMapping,
      "Active"
    );

    this.subscriptions = [
      this.locations$.subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
      })
    ]

    this.displayedColumns = ['name', 'city', 'dateContacted'];
  }

  ngOnInit(): void {
    console.log(this.locations$);
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: any) {
    this.filterValue = event.target.value
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }
}
