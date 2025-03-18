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
- [x] **Add Hotel Booking** (`POST /itinerary/{itinerary_id}/hotel`)
- [x] **Get Hotel Bookings for Itinerary** (`GET /itinerary/{itinerary_id}/hotel`)
- [x] **Update Hotel Booking** (`PATCH /hotel/{hotel_id}`)
- [x] **Delete Hotel Booking** (`DELETE /hotel/{hotel_id}`)

## Activity Management
- [x] **Add Activity** (`POST /itinerary/{itinerary_id}/activity`)
- [x] **Get Activities for Itinerary** (`GET /itinerary/{itinerary_id}/activity`)
- [x] **Update Activity** (`PATCH /activity/{activity_id}`)
- [x] **Delete Activity** (`DELETE /activity/{activity_id}`)

## Document Management
- [x] **Upload Travel Document** (`POST /itinerary/{itinerary_id}/document`)
- [x] **Get Travel Documents** (`GET /itinerary/{itinerary_id}/document`)
- [x] **Delete Travel Document** (`DELETE /document/{document_id}`)

## Payments Management
- [ ] **Make Payment for Itinerary** (`POST /itinerary/{itinerary_id}/payments`)
- [ ] **Get Payment History** (`GET /users/{user_id}/payments`)
- [ ] **Get Payment Details** (`GET /payments/{payment_id}`)
- [ ] **Refund or Cancel Payment** (`DELETE /payments/{payment_id}`)
