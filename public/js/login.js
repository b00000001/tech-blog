const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document
    .querySelector("#email-login")
    .value.trim()
    .toLowerCase();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    console.log(email, password);
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

const signupHandler = (event) => {
  console.log(event);
  event.preventDefault();

  const name = document.querySelector("#signUpName").value.trim();

  console.log(name);
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document.querySelector("#signupForm").addEventListener("click", signupHandler);
