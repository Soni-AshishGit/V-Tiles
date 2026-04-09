# V-Tiles Portfolio Project Flow

This document provides a comprehensive overview of the V-Tiles portfolio project, including its architecture, authentication flow, and dynamic management features.

---

## 🏗️ Project Architecture

The application is built using a modern MERN-like stack with specialized tools for 3D rendering and image hosting.

- **Frontend**: React (Vite) with Tailwind CSS for styling and Framer Motion for animations.
- **3D Engine**: React Three Fiber (Three.js) used in the `TileLab` to render interactive tile models.
- **Backend**: Node.js & Express API managing data and authentication.
- **Database**: MongoDB (via Mongoose) storing tile metadata, site settings, and admin records.
- **Image Hosting**: Cloudinary used for storing high-quality tile images and profile avatars.
- **Email Service**: Nodemailer used for sending secure OTPs to Vijay Sir.

---

## 🔐 Admin Authorization Flow (Personal & Secure)

Since this is a personal portfolio for Vijay Soni, the authorization is strictly restricted to the owner.

### **1. Restricted OTP Request**
- **Trigger**: Admin enters their email on the `/admin/login` page.
- **Validation**: The backend checks if the email matches the `ADMIN_EMAIL` defined in environment variables.
- **OTP Generation**: If valid, a 6-digit random code is generated and stored in MongoDB with a 10-minute expiration.
- **Delivery**: The code is sent to Vijay Sir's email using a premium HTML template via Nodemailer.

### **2. Verification & Session**
- **Verification**: Admin enters the 6-digit code.
- **JWT Issuance**: Upon successful verification, the server generates a JSON Web Token (JWT) valid for 12 hours.
- **Access**: The frontend stores the token in `localStorage` and grants access to the `/admin/dashboard`.

> **Note**: Public signup is disabled to prevent unauthorized access. Only the pre-defined admin email can initiate the login process.

---

## 🚀 Dynamic Features & Real-time Updates

The project uses a **Global Data Context** (`DataContext.jsx`) to ensure that any change made in the dashboard is reflected immediately on the main website without a manual refresh.

### **1. Tile Management**
- **Upload**: Vijay Sir can browse his computer for tile images.
- **Cloudinary Sync**: Images are uploaded to Cloudinary, and the resulting URL is saved to MongoDB.
- **3D Reflection**: New tiles automatically appear in the `TileLab` section. The system applies the image as a texture to the 3D model.
- **Scalability**: The material grid handles large collections with an elegant scrollable interface.

### **2. Profile & Branding**
- **Avatar**: Uploading a new photo in the dashboard updates the circular profile image in both the **Hero** and **Curator** sections.
- **Bio**: The curator's biography can be edited dynamically via the dashboard's Global Settings.
- **Socials**: WhatsApp numbers and social media links (Instagram, LinkedIn) are managed centrally.

---

## ☁️ Deployment Configuration (Netlify)

The project is optimized for Netlify deployment with the following configurations:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **SPA Redirects**: A `_redirects` file and `netlify.toml` ensure that deep links (like `/admin/dashboard`) work correctly by redirecting all traffic to `index.html`.
- **Environment Variables**: Sensitive data (MongoDB URI, Cloudinary Keys, Email credentials) are managed via Netlify's environment settings.

---

## 🛠️ Development Tools
- **Vite**: For blazing-fast local development.
- **Lucide React**: For a consistent, premium icon set.
- **Postman/Thunder Client**: For testing backend API endpoints.
