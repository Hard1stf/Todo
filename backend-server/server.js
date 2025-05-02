

const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');


const app = express();
const JWT_SECRET = "HARDIK-VIJETA";
const PORT = process.env.PORT || 3000;
const userDataBase = [];


// auth middleware for authorization.
const auth = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ "message": "error with your key." });
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        return res.status(401).json({ "message": "Unauthorized User." });
    }
}

// built-in middleware is used.
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Front-End/public")));

// "/" route for main index.html, which is entry point of front-end.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-End/public/index.html"));
});

// "/signup" route and route-handler renders the signup.html.
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-End/public/static/signup.html"));
})

// "/signin" route and route-handler renders the signin.html.
app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-End/public/static/signin.html"))
})

// "/user-profile-page" route and route-handler renders the user-profile.html.
app.get("/user-profile-page", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-End/public/static/user-profile.html"))
})


// signup route and route-handler:
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ "message": "Name, Email and Password is required." });
    }

    if (userDataBase.find(user => user.email === email)) {
        return res.status(409).json({ "message": "This email is already used here." });
    }

    userDataBase.push({ username, email, password });
    console.log(`New User: \nName:\t${username}\nEmail:\t${email}\nPassword:\t${password}`);
    res.status(200).json({ "message": "User Register Successful." })
});

// signin route and route-handler:
app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ "message": "Enter Email and Password." });
    }

    const isUserExist = userDataBase.find(user => user.email === email && user.password === password);

    if (isUserExist) {
        const token = jwt.sign({ email }, JWT_SECRET);
        res.status(200).json({ token });
        console.log(`\nUser-Status: \n[LOGIN]---User:\t${email}\nTOL: [${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}]`);
    } else {
        return res.status(401).json({ "message": "Email and Password is Wrong." });
    }
});

// uer-profile route and route-handler:
app.get("/user-profile", auth, (req, res) => {
    const decodedToken = req.user;

    const checkUserInfo = userDataBase.find(user => user.email === decodedToken.email)
    if (checkUserInfo) {
        res.status(200).json({
            "Name": checkUserInfo.username,
            "Email": checkUserInfo.email
        });
    } else {
        return res.status(403).json({ "message": "Access Denied." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is ONLINE --> "http://localhost:${PORT}"`);
})