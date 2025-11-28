# Next.js Product Management App

A simple product management web application built with **Next.js (App Router)**, **NextAuth.js**, and **Firebase Authentication**. The app demonstrates public and protected pages, responsive UI, and basic CRUD functionality for products.

---

## Features

- **Landing Page**

  - Navbar with logo, 4+ routes, login/register, sticky & responsive
  - Hero section with headline, subtitle, CTA
  - 4 additional sections: Features, Products, Testimonials, Banner
  - Footer with links, social icons, copyright
  - Uniform cards with hover/focus states

- **Authentication**

  - Firebase Authentication (Email & Google login)
  - Login/Register page with social login
  - Redirect to homepage after login
  - Protected pages accessible only when logged in

- **Products**

  - Item List Page with search bar and category filter (UI only)
  - Grid of cards with image, title, short description, price, and Details button
  - Item Details Page with large image/banner, full description, meta info, and back button

- **Protected Pages**
  - **Add Product**
    - Form fields: Title, Short description, Full description, Price, Date, Optional image URL
    - Submit button with toast confirmation on success
  - **Manage Products**
    - List of all products in table/grid layout
    - Actions: View, Delete
    - Clean, responsive design

---

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Authentication:** NextAuth.js + Firebase Authentication
- **Backend:** Simple Express.js server (for CRUD operations)
- **Styling:** Tailwind CSS / DaisyUI (or your preferred CSS framework)
- **Deployment:** Vercel

---

## Installation & Setup

Live URL: https://next-js-client-side-tau.vercel.app/
