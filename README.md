# Explore India — MERN Stack Project

A complete Full Stack Development project based on the provided **Generic MERN Stack Setup Guide**: React (JSX) + Vite, Node.js + Express, MongoDB + Mongoose, Axios, React Router and a CRUD API.

## 1. Project structure

```text
ExploreIndia/
├── backend/
│   ├── models/
│   │   ├── Item.js
│   │   ├── Itinerary.js
│   │   ├── User.js
│   │   ├── Plan.js
│   │   └── Inquiry.js
│   ├── routes/
│   │   ├── items.js
│   │   └── auth.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js
│   │   ├── components/
│   │   │   ├── ItemForm.jsx
│   │   │   ├── ItemList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
├── MONGODB-WINDOWS-GUIDE.md
└── START-WINDOWS.bat
```

The naming and separation intentionally follow the attached setup guide: a `backend` folder with `models` and `routes`, plus a Vite React `frontend` with `src/api`, `src/components`, and `App.jsx`.

## 2. Requirements

Install:
- Node.js 18 or newer
- MongoDB Community Server, or create a MongoDB Atlas cluster
- MongoDB Compass (recommended for visually checking the database)

Check Node/npm:

```powershell
node -v
npm -v
```

## 3. Start MongoDB locally on Windows

1. Install MongoDB Community Server.
2. Install MongoDB Compass.
3. During installation, keep the default MongoDB service option enabled when available.
4. Open **Windows Services** (`services.msc`).
5. Find the MongoDB service and click **Start** if it is not already running.
6. Open MongoDB Compass.
7. Connect with:

```text
mongodb://127.0.0.1:27017
```

You do not need to manually create `explore_india`. The seed script creates the collections/documents in that database when it inserts data.

## 4. Backend setup

Open Terminal 1 in the project root:

```powershell
cd backend
npm install
```

The PDF's standard dependencies are present here, plus authentication dependencies used by this project.

The included `backend/.env` is:

```env
MONGO_URI=mongodb://127.0.0.1:27017/explore_india
JWT_SECRET=explore-india-demo-secret-change-me
PORT=5000
```

For your own submission, change `JWT_SECRET` to a longer private value.

Seed the database:

```powershell
npm run seed
```

You should see a message similar to:

```text
✓ Seeded 12 destinations and 4 itineraries.
```

Start backend in development mode:

```powershell
npm run dev
```

Expected:

```text
✓ MongoDB connected
✓ Backend running at http://localhost:5000
```

## 5. Frontend setup

Open Terminal 2:

```powershell
cd frontend
npm install
npm run dev
```

Vite will show a URL similar to:

```text
http://localhost:5173/
```

Open that URL in Chrome.

The Vite config proxies `/api` requests to `http://localhost:5000`, so Axios can call the Express API without hard-coding the backend into every component.

## 6. What you can demonstrate

### Read data from MongoDB
Open the Destinations screen. It loads destination records using:

```text
React → Axios → Express /api/items → Mongoose → MongoDB
```

### Create / Update / Delete CRUD
Open:

```text
http://localhost:5173/manage
```

This is the CRUD demonstration page. It uses:
- `ItemForm.jsx` for Create and Update
- `ItemList.jsx` for Read and Delete
- `apiClient.js` for Axios calls
- `/api/items` Express routes
- `Item.js` Mongoose model

### Authentication
Create an account from the Sign in screen. Passwords are hashed before storage. Login returns a JWT used by the frontend for protected actions.

### Favourites
Guests can save favourites in browser storage. Signed-in users can persist favourites in MongoDB.

### Trip planner
The Plan a Trip screen collects four choices and saves them to the `plans` collection.

### Tourism agent enquiry
The enquiry modal saves submissions to MongoDB through `/api/inquiries`.

## 7. Useful API endpoints

```text
GET    /api/health
GET    /api/items
GET    /api/items/:id
POST   /api/items
PUT    /api/items/:id
DELETE /api/items/:id
GET    /api/destinations
POST   /api/auth/register
POST   /api/auth/login
GET    /api/me
POST   /api/favorites/:slug
GET    /api/itineraries
POST   /api/plans
GET    /api/plans
POST   /api/inquiries
```

## 8. Check MongoDB Compass

After running `npm run seed`:

1. Open Compass.
2. Connect to `mongodb://127.0.0.1:27017`.
3. In the left panel open `explore_india`.
4. You should see collections such as:
   - `items`
   - `itineraries`
5. After creating users/plans/enquiries, you will also see:
   - `users`
   - `plans`
   - `inquiries`

## 9. Build frontend for production

From `frontend`:

```powershell
npm run build
```

Then the generated `frontend/dist` folder can be served by the Express backend. Start the backend and open `http://localhost:5000`.

## 10. Common fixes

### Error: MongoDB connection failed
Make sure the MongoDB Windows service is running and that `.env` contains the correct `MONGO_URI`.

### Error: `npm` is not recognized
Install Node.js, then restart the terminal/VS Code.

### Port 5000 already in use
Change `PORT=5000` in `backend/.env`, then update the Vite proxy in `frontend/vite.config.js` to the same port.

### Frontend says it cannot reach the server
Make sure both terminals are running:
- Terminal 1: `cd backend` → `npm run dev`
- Terminal 2: `cd frontend` → `npm run dev`

### Seed again
Running `npm run seed` resets the sample destinations, itineraries and demo users. Do not use it after you have entered real data that you want to keep.

## 11. Presentation explanation

> “This is a MERN Stack tourism application called Explore India. The frontend is built using React JSX and Vite. Axios is used for API requests. The backend is built using Node.js and Express. MongoDB stores destinations, itineraries, users, trip plans and enquiries, while Mongoose defines the schemas. The main CRUD resource follows the required `models/Item.js`, `routes/items.js`, `ItemForm.jsx` and `ItemList.jsx` structure.”
