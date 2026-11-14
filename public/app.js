console.log("app.js connected");

const inputField = document.createElement("div");
inputField.className = "inputField";

const userLabel = document.createElement("label");
userLabel.textContent = "Username";
userLabel.className = "Label";


const userNameInput = document.createElement("input");
userNameInput.type = "text";
userNameInput.className = "Input";
userNameInput.placeholder = "username";


const passLabel = document.createElement("label");
passLabel.textContent = "Password";
passLabel.className = "Label";



const passInput = document.createElement("input");
passInput.type = "password";
passInput.className = "Input";
passInput.placeholder = "password";

const signInButton = document.createElement("button");
signInButton.type = "button";
signInButton.textContent = "Sign in";
signInButton.className = "button";


inputField.append(userLabel,  userNameInput,passLabel,passInput,signInButton);


document.body.appendChild(inputField);


signInButton.addEventListener("click", async () => {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: userNameInput.value,
            password: passInput.value
        })
    });

    const data = await response.json();

    if (data.success) {
        alert(data.message);
    } else {
        alert(data.message);   // "Wrong username or password"
    }
});

