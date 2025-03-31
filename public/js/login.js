fetch("http://localhost:3000/check-cookie", {
    method: "GET",
    credentials: "include" // Ensures cookies are included
  })
    .then(response => response.json())
    .then(data => console.log("Cookies:", data.cookies));

fetch("http://localhost:3000/login", {
    method: "POST",
    credentials: "include", // Required for cookies to be stored
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "testUser", password: "123456" }),
  });