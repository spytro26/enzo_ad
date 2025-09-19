# Enzo Admin Panel

A comprehensive admin panel for managing Enzo users and their equipment details including cold rooms, freezers, and blasters.

## 🚨 FIRST TIME SETUP - REQUIRED!

**Before you can login, you MUST create the admin user in Firebase:**

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**: `enzo-d373f`
3. **Navigate to**: Authentication → Users
4. **Click "Add user"**
5. **Create user with**:
   - Email: `admin@enzo.com`
   - Password: `admin123`
6. **Save the user**

❌ **Without this step, login will fail with "Invalid credentials" error!**

## Default Admin Credentials

- **Email**: `admin@enzo.com`
- **Password**: `admin123`

## Features

- **Secure Authentication**: Protected admin access with default credentials
- **User Management**: View and manage all users from Firestore
- **Equipment Tracking**: Track cold room, freezer, and blaster details
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Data**: Live updates from Firestore database

## Prerequisites

1. Node.js (v14 or higher)
2. Firebase project with:
   - Authentication enabled
   - Firestore database set up
   - Admin user created with the credentials above

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up Firebase Authentication:

   - Go to Firebase Console > Authentication
   - Create a user with email: `admin@enzo.com` and password: `admin123`

3. Set up Firestore Database:
   - Create a collection named `users` (or `customers` or `clients`)
   - Each user document should have the following structure:
   ```json
   {
     "name": "User Name",
     "phone": "1234567890",
     "city": "City Name",
     "email": "user@example.com",
     "address": "Full Address",
     "coldRoom": {
       "capacity": "100kg",
       "temperature": "-18°C",
       "model": "CR-100"
     },
     "freezer": {
       "capacity": "50kg",
       "temperature": "-20°C",
       "model": "FR-50"
     },
     "blaster": {
       "capacity": "25kg",
       "temperature": "-40°C",
       "model": "BL-25"
     }
   }
   ```

## Development

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Building for Production

1. Build the application:

   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Deployment

The built application can be deployed to any static hosting service:

- **Firebase Hosting**: `firebase deploy`
- **Netlify**: Connect your GitHub repository
- **Vercel**: Connect your GitHub repository

## Firebase Schema Detection

The application automatically detects your Firestore schema and tries these collection names:

- `users`
- `customers`
- `clients`

If your collection has a different name, update the `possibleCollections` array in `src/components/UserList.tsx`.

## Security

- Authentication is required for all admin operations
- Firebase security rules should be configured properly
- The default admin credentials should be changed in production

## Troubleshooting

### "No users found" message

- Check if your Firestore collection name matches the expected names
- Ensure Firestore rules allow read access for authenticated users
- Verify that the Firebase configuration is correct

### Login issues

- Ensure the admin user exists in Firebase Authentication
- Check browser console for authentication errors
