# MongoDB Windows setup — Explore India

## Option A — MongoDB Community Server (recommended for local college demo)

1. Install MongoDB Community Server for Windows.
2. Choose the standard installation.
3. When the installer offers to run MongoDB as a Windows service, leave that option enabled.
4. Install MongoDB Compass as well.
5. Press `Win + R`, type `services.msc`, press Enter.
6. Find the MongoDB service and make sure its status is **Running**.
7. Open MongoDB Compass.
8. Use this connection string:

```text
mongodb://127.0.0.1:27017
```

9. Click Connect.
10. Run the Explore India seed command from the backend folder:

```powershell
npm run seed
```

11. Refresh Compass. You should now see:

```text
explore_india
├── items
└── itineraries
```

Once the application is used, `users`, `plans` and `inquiries` collections will appear as records are created.

## Option B — MongoDB Atlas

Use Atlas when you do not want to run MongoDB locally.

1. Create a MongoDB Atlas account.
2. Create a free-tier cluster.
3. Add your IP address in Network Access.
4. Create a database user.
5. Choose **Connect → Drivers** and copy the MongoDB connection string.
6. In `backend/.env`, replace `MONGO_URI` with your Atlas string.
7. Keep the rest:

```env
JWT_SECRET=your-private-secret
PORT=5000
```

8. Run:

```powershell
cd backend
npm install
npm run seed
npm run dev
```

## Important

Do not commit a real `.env` containing private Atlas credentials to GitHub. Use `.env.example` as the public template.
