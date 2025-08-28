// server/index.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const drugResponseRoutes = require('./routes/drugResponse');
const { connectToDatabase } = require('./mongo');

const app = express();
const upload = multer(); // for parsing multipart/form-data (fields only)

app.get("/", (req,res)=>{
    res.send('hello on server 5000');
})
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// parse multipart/form-data (FormData from the frontend). .none() parses text fields only.
app.use(upload.none());

// Enable CORS for your frontend during development (or remove if using Vite proxy)
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));

async function start() {
    await connectToDatabase();
    app.use('/api/drugresponse', drugResponseRoutes);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}
  
start().catch(err => {
console.error('Failed to start server', err);
process.exit(1);
});
