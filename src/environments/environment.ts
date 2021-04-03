// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  locations: {
    spreadsheetId: '1m3cncWqu-6iLHG0u9kBc7fsTZV-LDHSe03kognRpQ7M',
    worksheetId: 2,
  },
  firebase: {
    apiKey: 'AIzaSyAZXqRz-oQnLo_OUre3fzpx-VvtkO5k_Zw',
    authDomain: 'jabhunter-dcc6a.firebaseapp.com',
    databaseURL: 'https://jabhunter-dcc6a-default-rtdb.firebaseio.com/',
    projectId: 'jabhunter-dcc6a',
    storageBucket: 'jabhunter-dcc6a.appspot.com',
    messagingSenderId: '425998428166',
    appId: '1:425998428166:web:dc1f832e3d010d44ff7b87',
    measurementId: 'G-RP681RL6MK'
  },
  table: {
    columns: ['dateContacted', 'name', 'vaccineBrands', 'city']
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
