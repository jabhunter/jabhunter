import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';
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
export class HomeComponent implements OnInit {
  panelOpenState = false;
  dataSource = new MatTableDataSource();
  locations$: Observable<Location[]>;
  displayedColumns: string[]
  spreadsheetId: string;
  worksheetId: number;
  googleStatus: string;
  filterSelectObj: any;
  filterValues: any;

  constructor(private googleSheetsDbService: GoogleSheetsDbService, private sanitizer: DomSanitizer) {
    this.spreadsheetId = environment.locations.spreadsheetId;
    this.worksheetId = environment.locations.worksheetId;
    this.googleStatus = "Active";
    this.displayedColumns = ['id', 'name'];

    this.locations$ = this.googleSheetsDbService.getActive<Location>(
      this.spreadsheetId,
      this.worksheetId,
      locationAttributesMapping,
      this.googleStatus
    );
    this.filterSelectObj = [
      {
        name: 'ID',
        columnProp: 'id',
        options: []
      }, {
        name: 'NAME',
        columnProp: 'name',
        options: []
      }, {
        name: 'USERNAME',
        columnProp: 'username',
        options: []
      }, {
        name: 'EMAIL',
        columnProp: 'email',
        options: []
      }, {
        name: 'STATUS',
        columnProp: 'status',
        options: []
      }
    ]
  }

  ngOnInit(): void {
    this.getRemoteData();
  }

  getRemoteData() {

    const remoteDummyData = [
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "status": "Active"
      },
    ];
    this.dataSource.data = remoteDummyData;


    this.filterSelectObj.filter((o: any) => {
      o.options = this.getFilterObject(remoteDummyData, o.columnProp);
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
}
