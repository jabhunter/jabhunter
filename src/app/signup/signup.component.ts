import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-faq',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  {
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', []);

  getErrorMessage() {
    if (
      this.email.hasError('required') ||
      this.name.hasError('required') ||
      this.phone.hasError('required')
      ) {
      return 'Please enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  constructor(private fb: FormBuilder) {
    // this.form = this.fb.group({
    //   UnitName: ['this.editUnit.UnitName', Validators.required],
    //   Area:     ['this.editUnit.Area', Validators.required],
    //   OwnerId: ['this.editUnit.OwnerId'],
    //   IsWithParking: ['this.editUnit.IsWithParking'],
    //   ParkingArea: ['this.editUnit.ParkingArea'],
    // });
  }

  submitForm() {
    
  }
  cancel() {}
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

