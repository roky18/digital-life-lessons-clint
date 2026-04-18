# 🌱 Digital Life Lessons

🔗 **Live Site:** https://digital-life-lessons-ef218.web.app

## 📖 Project Overview

Digital Life Lessons is a full-stack web platform where users can create, store, and share meaningful life lessons and personal growth insights. The platform encourages reflection, learning, and modern user experience.

Users can create personal lessons, browse public lessons from the community, save favorites, react, comment, and upgrade to a Premium plan to unlock exclusive premium lessons.

---

## ✨ Key Features

- 🔐 Secure authentication using **Firebase** (Email/Password & Google Login)
- 📝 Create, update, and delete personal life lessons
- 🌍 Browse public lessons with
- 🔒 Premium lessons locked/blurred for Free users with upgrade prompt
- ⭐ Stripe one-time payment for lifetime Premium access
- ❤️ Like, comment, favorite, and report lessons in real time
- 📊 User dashboard with analytics and quick actions
- 👮 Admin dashboard for managing users, lessons, and reported content
- 🎨 Fully responsive UI using **Tailwind CSS & DaisyUI**

---

## 🛠️ Technologies Used

### Frontend

- React + Vite
- React Router DOM
- Tailwind CSS & DaisyUI
- TanStack React Query
- Firebase Authentication
- Axios
- SweetAlert2

### Backend

- Node.js & Express.js
- MongoDB
- Firebase Admin SDK
- Stripe Payment Gateway

---

## ⚙️ Client Side Setup (Frontend)

Follow these steps to run the frontend locally:

1. **Clone the Repo:** `https://github.com/roky18/digital-life-lessons-clint.git`
2. **Install dependencies:** `npm install`
3. **Environment Variables:** Create a `.env.local` file and add:
 ```env
   VITE_apiKey=your_api_key
   VITE_authDomain=your_auth_domain
   VITE_projectId=your_project_id
   VITE_storageBucket=your_storage_bucket
   VITE_messagingSenderId=your_messaging_id
   VITE_appId=your_app_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```
4. **Run the App:** `npm run dev`
## 👤 Author

**MD RAKIBUL ISLAM ROKY**

---

✨ _Digital Life Lessons — Preserve wisdom. Learn from life. Grow together._
