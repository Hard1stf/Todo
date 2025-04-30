

const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');


const app = express();
const JWT_SECRET = "HARDIK-VIJETA";



app.listen(PORT, () => {
    console.log(`Server is ONLINE --> "http://localhost:${PORT}"\n`);
})