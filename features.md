# Travel App REST API Features

## Authentication & User Management
- [x] **User Registration** (`POST /auth/signup`)
- [x] **User Login** (`POST /auth/login`)
- [x] **User Profile** (`GET /users/{user_id}`)
- [ ] **Update User** (`PATCH /users/{user_id}`)

## Itinerary Management
- [x] **Create Itinerary** (`POST /itinerary`)
- [x] **Get User Itineraries** (`GET /users/{user_id}/itinerary`)
- [x] **Get Itinerary Details** (`GET /itinerary/{itinerary_id}`)
- [x] **Update Itinerary** (`PATCH /itinerary/{itinerary_id}`)
- [x] **Delete Itinerary** (`DELETE /itinerary/{itinerary_id}`)

## Flights Management
- [x] **Add Flight to Itinerary** (`POST /itinerary/{itinerary_id}/flight`)
- [x] **Get Flights for Itinerary** (`GET /itinerary/{itinerary_id}/flight`)
- [x] **Update Flight Details** (`PATCH /flight/{flight_id}`)
- [x] **Remove Flight from Itinerary** (`DELETE /flight/{flight_id}`)

## Hotel Booking Management
- [ ] **Add Hotel Booking** (`POST /itinerary/{itinerary_id}/hotels`)
- [ ] **Get Hotel Bookings for Itinerary** (`GET /itinerary/{itinerary_id}/hotels`)
- [ ] **Update Hotel Booking** (`PATCH /hotels/{hotel_id}`)
- [ ] **Delete Hotel Booking** (`DELETE /hotels/{hotel_id}`)

## Activity Management
- [ ] **Add Activity** (`POST /itinerary/{itinerary_id}/activities`)
- [ ] **Get Activities for Itinerary** (`GET /itinerary/{itinerary_id}/activities`)
- [ ] **Update Activity** (`PATCH /activities/{activity_id}`)
- [ ] **Delete Activity** (`DELETE /activities/{activity_id}`)

## Document Management
- [ ] **Upload Travel Document** (`POST /itinerary/{itinerary_id}/documents`)
- [ ] **Get Travel Documents** (`GET /itinerary/{itinerary_id}/documents`)
- [ ] **Delete Travel Document** (`DELETE /documents/{document_id}`)

## Payments Management
- [ ] **Make Payment for Itinerary** (`POST /itinerary/{itinerary_id}/payments`)
- [ ] **Get Payment History** (`GET /users/{user_id}/payments`)
- [ ] **Get Payment Details** (`GET /payments/{payment_id}`)
- [ ] **Refund or Cancel Payment** (`DELETE /payments/{payment_id}`)
