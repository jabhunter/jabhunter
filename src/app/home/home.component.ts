import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location, locationAttributesMapping } from '../location.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  dataSource = new MatTableDataSource();
  locations$: Observable<Location[]>;
  displayedColumns: string[]
  spreadsheetId: string;
  worksheetId: any;
  googleStatus: any;
  filterSelectObj: any;
  filterValues: any;
  subscriptions: Subscription[] = [];
  data: Location[];

  constructor(private googleSheetsDbService: GoogleSheetsDbService, private sanitizer: DomSanitizer) {
    this.spreadsheetId = environment.locations.spreadsheetId;
    this.worksheetId = environment.locations.worksheetId;
    this.googleStatus = "Active";
    this.displayedColumns = ['id', 'name', 'address', 'lastUpdated', 'link', 'locationType', 'noteDates', 'notes', 'phone'];
    this.data = [];

    this.locations$ = this.googleSheetsDbService.getActive<Location>(
      this.spreadsheetId,
      this.worksheetId,
      locationAttributesMapping,
      this.googleStatus
    );
    this.getSubscriptions();
    this.filterSelectObj = [
      {
        name: 'ID',
        columnProp: 'id',
        options: []
      },
      {
        name: 'NAME',
        columnProp: 'name',
        options: []
      },
      {
        name: 'ADDRESS',
        columnProp: 'address',
        options: []
      },
      {
        name: 'LASTUPDATED',
        columnProp: 'lastUpdated',
        options: []
      },
      {
        name: 'LINK',
        columnProp: 'link',
        options: []
      },
      {
        name: 'LOCATIONTYPE',
        columnProp: 'locationType',
        options: []
      },
      {
        name: 'NOTEDATES',
        columnProp: 'noteDates',
        options: []
      },
      {
        name: 'NOTES',
        columnProp: 'notes',
        options: []
      },
      {
        name: 'PHONE',
        columnProp: 'phone',
        options: []
      },
    ];
  }

  ngOnInit(): void {
    this.getRemoteData();
  }

  getSubscriptions(): void {
    this.subscriptions = [
      this.locations$.subscribe(res => {
        this.data = res
      })
    ];
  }

  getRemoteData(): void {
    console.log("data", this.data);
    this.dataSource.data = this.data;
    console.log("data source", this.dataSource)


    this.filterSelectObj.filter((o: any) => {
      o.options = this.getFilterObject(this.data, o.columnProp);
    });
  }


  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  // Called on Filter change
  filterChange(filter: any, event: any) {
    let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word: any) => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value: any) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe())
  }
}
