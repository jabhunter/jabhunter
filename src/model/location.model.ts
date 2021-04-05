
export interface Location {
  timestamp: string;
  guid: string;
  contactMethod: string;
  links: string[];
  phoneNumbers: string[];
  email: string;
  name: string;
  streetAddress: string;
  city: string;
  zip: string,
  reportType: string;
  locationType: string;
  eventStartDate: string;
  eventEndDate: string;
  isVaccineInStock: string;
  vaccineBrands: string;
  isAppointmentOffered: string;
  daysOfWeekVaccineAvail: string;
  lastAppointmentOfDay: string;
  brandNameOfLocation: string;
  county: string;
  extraDosePolicy: string;
  dateContacted: string;
  note: string;
}
