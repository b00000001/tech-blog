const signupHandler = async (event) => {
  console.log(event);
  event.preventDefault();

  const username = document.querySelector("#signUpName").value.trim();
  const email = document
    .querySelector("#signUpEmail")
    .value.trim()
    .toLowerCase();
  const password = document.querySelector("#signUpPassword").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to sign up, please try again");
    }
  }
};

document.querySelector("#signupForm").addEventListener("click", signupHandler);
