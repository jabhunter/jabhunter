export const locationAttributesMapping = {
  id: "ID",
  name: "Name",
  phone: "Phone Number",
  address: {
    _prefix: "Address",
    street: "Street",
    streetNumber: "Street Number",
    zip: "Zip",
    city: "City"
  },
  notes: {
    _prefix: "Note",
    _listField: true
  },
  noteDates: {
    _prefix: "Note Date",
    _listField: true
  },
  locationType: "Location Type",
  link: "Link"
};

export interface Location {
  id: string;
  name: string;
  phone: string;
  address: {
    street: string;
    streetNumber: string;
    zip: string;
    city: string;
  };
  notes: string[];
  noteDates: string[];
  locationType: string;
  link: string;
}
