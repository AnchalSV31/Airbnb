# Airbnb Clone - MERN Stack

## Overview
This project is a full-stack **Airbnb Clone** built using the **MERN (MongoDB, Express, React, Node.js) stack**. It provides users with the ability to browse, book, and list rental properties, similar to Airbnb.

## Features
- **User Authentication**: Sign up, login, and logout functionality.
- **JWT Authentication**: Secure user sessions using JSON Web Tokens.
- **Property Listings**: Users can list and manage properties.
- **Booking System**: Users can book and manage their reservations.
- **Search and Filters**: Find properties using search and filters.
- **Image Uploads**: Upload images for properties using Cloudinary.
- **Reviews & Ratings**: Users can leave reviews for properties.
- **Payment Integration**: Secure payment processing (Stripe/PayPal integration).
- **Responsive Design**: Works on all screen sizes.

## Technologies Used
### Frontend (React)
- React.js (Functional Components, Hooks)
- React Router
- TailwindCSS (or Bootstrap for styling)
- Axios (for API calls)

### Backend (Node.js & Express)
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JSON Web Token (JWT) Authentication
- Multer (for image uploads)
- Cloudinary (for image storage)
- Stripe/PayPal (for payments)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/airbnb-clone.git
   ```

2. Install dependencies:
   ```sh
   cd airbnb-clone
   npm install
   cd client
   npm install
   ```

3. Set up environment variables in `.env` file:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend server:
   ```sh
   cd ..
   npm run server
   ```

5. Start the frontend client:
   ```sh
   cd client
   npm start
   ```

## API Routes
### User Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Add a new property (authenticated)
- `GET /api/properties/:id` - Get a single property
- `DELETE /api/properties/:id` - Delete a property (authenticated)

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/:userId` - Get all bookings of a user

## Future Improvements
- Implement Google OAuth for authentication.
- Add a messaging system between users and hosts.
- Implement real-time notifications for bookings.

## Contribution
Contributions are welcome! Feel free to fork the project and submit a pull request.

## License
This project is open-source and available for modification.

---
**Author**: Anchal Shukla
