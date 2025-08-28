// server/routes/drugResponse.js
const { Router } = require('express');
const router = Router();
const { search } = require('../controllers/drugResponseController');

router.post('/search', search);
router.get("/", (req,res)=>{
    console.log("the server is running");
    res.json("the server is running");
})

module.exports = router;
