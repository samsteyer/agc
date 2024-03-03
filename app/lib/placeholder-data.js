const users = [
  {
    id: '9edce6df-5931-4d47-9af7-c1083243a377',
    email: "sam.steyer@gmail.com",
    first_name: "Sam",
    last_name: "Steyer",
  },
  {
    id: 'e65e956f-f019-4ce3-9ef6-b114f59cb790',
    email: "gus.steyer@gmail.com",
    first_name: "Gus",
    last_name: "Steyer",
  }
]
const homes = [
  {
    id: 'bf74c376-8f44-4870-b894-13fdc2ac194b',
    user_id: '9edce6df-5931-4d47-9af7-c1083243a377',
    address: "1913 Baker St.",
    city: "San Francisco",
    state: "CA",
    country: "United States",
    zip: "94115",
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3400,
    roof_area: 1150,
    heating: "Forced air, natural gas",
    ac: "Forced air, 3 compressors, electric",
    year_built: 1885,
    last_remodel: 2021 
  },
  {
    id: 'e65e956f-f019-4ce3-9ef6-b114f59cb790',
    user_id: 'e65e956f-f019-4ce3-9ef6-b114f59cb790',
    address: "328 Seadrift Rd.",
    city: "Stinson Beach",
    state: "CA",
    country: "United States",
    zip: "94970",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1900,
    roof_area: 1900,
    heating: "Baseboard, electric",
    ac: "None",
    year_built: 1970,
    last_remodel: 1997
  },
  {
    id: '1fcb6e2e-9e30-11ee-8c90-0242ac120002',
    address: "3030 Pacific Ave.",
    user_id: '9edce6df-5931-4d47-9af7-c1083243a377',
    city: "San Francisco",
    state: "CA",
    country: "United States",
    zip: "94225",
    bedrooms: 6,
    bathrooms: 7,
    sqft: 7000,
    roof_area: 1500,
    heating: "Forced air, natural gas",
    ac: "None",
    year_built: 1901,
    last_remodel: 1995
  }
];

module.exports = { users, homes };
