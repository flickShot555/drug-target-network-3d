// server/index.js
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import drugResponseRoutes from './routes/drugResponse.js'; // ensure .js if "type":"module"

const app = express();
const upload = multer(); // for parsing multipart/form-data (fields only)

app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// parse multipart/form-data (FormData from the frontend). .none() parses text fields only.
app.use(upload.none());

// Enable CORS for your frontend during development (or remove if using Vite proxy)
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));

// mount your router (this creates the URL space /api/drugresponse/*)
app.use('/api/drugresponse', drugResponseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
