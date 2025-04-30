

const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');


const app = express();
const JWT_SECRET = "HARDIK-VIJETA";

const PORT = process.env.PORT || 3000;
const userDataBase = [];


const auth = async (req, res, next) => {
    // code: Logic of Authorization.
}


app.use(express.json());

app.post("/signup", (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({"message": "Name, Email and Password is required."});
    }

    if(userDataBase.find(user => user.email === email)){
        return res.status(409).json({"message": "This email is already used here."});
    }

    userDataBase.push({username, email, password});
    console.log(`New User: \nName:\t${username}\nEmail:\t${email}\nPassword:\t${password}`);
    res.status(200).json({"message": "User Register Successful."})
});

app.post("/signin", (req,res) => {
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({"message": "Enter Email and Password."});
    }

    const isUserExist = userDataBase.find(user => user.email === email && user.password === password);

    if(isUserExist){
        const token = jwt.sign({email}, JWT_SECRET);
        res.status(200).json({token});
        console.log(`[LOGIN]---User:\t${email}`);
    }else{
        return res.status(401).json({"message": "Email and Password is Wrong."});
    }
});

app.listen(PORT, () => {
    console.log(`Server is ONLINE --> "http://localhost:${PORT}"\n`);
})