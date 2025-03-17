# 🌍 Travel App REST API Features  

## ✅ 1. User Management 👤  
- [x] `POST /auth/signup` – Register a new user  
- [x] `POST /auth/login` – Authenticate user & generate token  
- [ ] `GET /users/{user_id}` – Fetch user profile  
- [ ] `PUT /users/{user_id}` – Update user profile/preferences  
- [ ] `DELETE /users/{user_id}` – Delete account  

## ✅ 2. Itinerary Management 🗺️  
- [ ] `POST /itineraries` – Create a new itinerary  
- [ ] `GET /itineraries/{itinerary_id}` – Fetch itinerary details  
- [ ] `GET /users/{user_id}/itineraries` – Get all user itineraries  
- [ ] `PUT /itineraries/{itinerary_id}` – Update itinerary details  
- [ ] `DELETE /itineraries/{itinerary_id}` – Delete itinerary  

## ✅ 3. Flight Management ✈️  
- [ ] `GET /flights/search?origin=XXX&destination=YYY&date=YYYY-MM-DD` – Search flights  
- [ ] `POST /flights/book` – Book a flight  
- [ ] `GET /flights/{flight_id}` – Get flight details  
- [ ] `DELETE /flights/{flight_id}` – Cancel flight booking  

## ✅ 4. Hotel & Accommodation Management 🏨  
- [ ] `GET /hotels/search?location=XXX&checkin=YYYY-MM-DD&checkout=YYYY-MM-DD` – Search hotels  
- [ ] `POST /hotels/book` – Book a hotel  
- [ ] `GET /hotels/{hotel_id}` – Get hotel details  
- [ ] `DELETE /hotels/{hotel_id}` – Cancel hotel booking  

## ✅ 5. Activity & Transport Booking 🚗🎟️  
- [ ] `GET /activities/search?location=XXX&date=YYYY-MM-DD` – Search activities  
- [ ] `POST /activities/book` – Book an activity  
- [ ] `GET /activities/{activity_id}` – Get activity details  
- [ ] `DELETE /activities/{activity_id}` – Cancel booking  

## ✅ 6. File & Document Management 📂  
- [ ] `POST /documents/upload` – Upload travel documents  
- [ ] `GET /documents/{document_id}` – Fetch document details  
- [ ] `DELETE /documents/{document_id}` – Delete a document  

## ✅ 7. Payment & Transactions 💳  
- [ ] `POST /payments` – Process a payment  
- [ ] `GET /payments/{payment_id}` – Fetch payment details  
- [ ] `GET /users/{user_id}/payments` – Get all user payments  
- [ ] `DELETE /payments/{payment_id}` – Cancel a payment  

## ✅ 8. Notifications & Alerts 🔔  
- [ ] `POST /notifications` – Send a notification  
- [ ] `GET /users/{user_id}/notifications` – Get user notifications  
- [ ] `DELETE /notifications/{notification_id}` – Delete a notification  

## ✅ 9. Admin & Analytics 📊  
- [ ] `GET /admin/stats` – Get travel trends & analytics  
- [ ] `GET /admin/users` – Fetch all users  
- [ ] `DELETE /admin/users/{user_id}` – Ban a user  