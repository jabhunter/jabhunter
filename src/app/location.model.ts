import { SelectionRange } from "typescript";

export const locationAttributesMapping = {
  timestamp: "Timestamp",
  guid: "Guid",
  contactMethod: "Contact Method",
  links: {
    _prefix: "Website Link",
    _listField: true
  },
  phoneNumbers: {
    _prefix: "Phone",
    _listField: true
  },
  email: "Email",
  name: "Location Name",
  streetAddress: "Street Address of Location",
  city: "City", 
  zip: "Zip Code",
  reportType: "What Are You Hunting",
  locationType: "Location Type",
  eventStartDate: "Start Date of Event if applicable",
  eventEndDate: "End Date of Event if applicable",
  isVaccineInStock: "Is the Vaccine Currently in Stock Here",
  vaccineBrands: "Vaccine Brands Offered",
  isAppointmentOffered: "Does This Location Schedule Appointments",
  daysOfWeekVaccineAvail: "Which Days of Week is Vaccine Available if applicable",
  lastAppointmentOfDay: "Last Vaccine Appointment of the Day if applicable",
  brandNameOfLocation: "Location Chain or Brand Name",
  county: "County",
  extraDosePolicy: "How Are Extra Vaccines Handled",
  dateContacted: "Date Contacted",
  note: "Note 1"
};

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
