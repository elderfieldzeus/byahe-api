# Travel App REST API Features

## Authentication & User Management
- [x] **User Registration** (`POST /auth/signup`)
- [x] **User Login** (`POST /auth/login`)
- [x] **User Profile** (`GET /users/{user_id}`)
- [ ] **Update User** (`PATCH /users/{user_id}`)

## Itinerary Management
- [x] **Create Itinerary** (`POST /itineraries`)
- [x] **Get User Itineraries** (`GET /users/{user_id}/itineraries`)
- [x] **Get Itinerary Details** (`GET /itineraries/{itinerary_id}`)
- [x] **Update Itinerary** (`PATCH /itineraries/{itinerary_id}`)
- [x] **Delete Itinerary** (`DELETE /itineraries/{itinerary_id}`)

## Flights Management
- [ ] **Add Flight to Itinerary** (`POST /itineraries/{itinerary_id}/flights`)
- [ ] **Get Flights for Itinerary** (`GET /itineraries/{itinerary_id}/flights`)
- [ ] **Update Flight Details** (`PATCH /flights/{flight_id}`)
- [ ] **Remove Flight from Itinerary** (`DELETE /flights/{flight_id}`)

## Hotel Booking Management
- [ ] **Add Hotel Booking** (`POST /itineraries/{itinerary_id}/hotels`)
- [ ] **Get Hotel Bookings for Itinerary** (`GET /itineraries/{itinerary_id}/hotels`)
- [ ] **Update Hotel Booking** (`PATCH /hotels/{hotel_id}`)
- [ ] **Delete Hotel Booking** (`DELETE /hotels/{hotel_id}`)

## Activity Management
- [ ] **Add Activity** (`POST /itineraries/{itinerary_id}/activities`)
- [ ] **Get Activities for Itinerary** (`GET /itineraries/{itinerary_id}/activities`)
- [ ] **Update Activity** (`PATCH /activities/{activity_id}`)
- [ ] **Delete Activity** (`DELETE /activities/{activity_id}`)

## Document Management
- [ ] **Upload Travel Document** (`POST /itineraries/{itinerary_id}/documents`)
- [ ] **Get Travel Documents** (`GET /itineraries/{itinerary_id}/documents`)
- [ ] **Delete Travel Document** (`DELETE /documents/{document_id}`)

## Payments Management
- [ ] **Make Payment for Itinerary** (`POST /itineraries/{itinerary_id}/payments`)
- [ ] **Get Payment History** (`GET /users/{user_id}/payments`)
- [ ] **Get Payment Details** (`GET /payments/{payment_id}`)
- [ ] **Refund or Cancel Payment** (`DELETE /payments/{payment_id}`)
