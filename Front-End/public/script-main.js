
// Render the static pages as per they call.

async function goToSignup() {
    window.location.href = "http://localhost:3000/signup";
}

async function goToSignin() {
    window.location.href = "http://localhost:3000/signin";
}

async function goToUserInfo() {
    window.location.href = "http://localhost:3000/user-profile-page";
}

async function goToHome() {
    window.location.href = "http://localhost:3000/";
}





async function signup() {
    const username = document.querySelector("#signup-username").value;
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    await axios.post("http://localhost:3000/signup", {
        username: username,
        email: email,
        password: password
    });
    alert("You are signup successful.");
}


async function signin() {
    const email = document.querySelector("#signin-email").value;
    const password = document.querySelector("#signin-password").value;

    if (!email || !password) {
        return alert("Enter Email and Password to login.");
    }

    const response = await axios.post("http://localhost:3000/signin", {
        email: email,
        password: password
    })
    localStorage.setItem("token", response.data.token);
    alert("You are Signin successfully.");
}


async function getUserInfo() {
    if (localStorage.getItem("token")) {
        try {
            const response = await axios.get("http://localhost:3000/user-profile", {
                headers: { authorization: localStorage.getItem("token") }
            });

            // Check if the response contains the expected data
            // console.log(response.data.);
            if (response.data && response.data.Name && response.data.Email) {
                const userInfoContainer = document.querySelector("#information");
                userInfoContainer.innerHTML = `
                    <br><strong>Name: </strong>${response.data.Name}
                    <br><strong>Email: </strong>${response.data.Email}
                `;
                alert(`Hi, ${response.data.Name}.`);
            } else {
                alert("Failed to fetch user information. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            alert("Error fetching user information. Please ensure you are logged in.");
        }
    } else {
        alert("You have to login first.");
    }
}

async function logout() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        alert("User is logging out now.");
        const userInfoContainer = document.querySelector("#information");
        userInfoContainer.innerHTML = "";
        window.location.href = "http://localhost:3000";
    } else {
        alert("User is already LogOut.");
        window.location.href = "http://localhost:3000";
        return;
    }
}