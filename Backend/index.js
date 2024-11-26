const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json()); // Ensures JSON body parsing
app.use(cors());

const PORT = 5000;
let url = "https://gorest.co.in/public/v2/users";

// Middleware to set authentication headers
app.use((req, res, next) => {
  console.log("Request Received");
  console.log("Request Path:", req.path);
  console.log("Request Method:", req.method);
  //
  req.authHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer b6c0e957c5b2abcbde45bc63d0437652420486b559c6a5abdec17006cd9e7f84",
  };
  next();
});
// let base_url = 'http://localhost:5000'
app.post("/adduser", async (req, res) => {
  const userData = req.body;
  console.log(userData);
  try {
    // Validate payload before sending
    if (
      !userData.name ||
      !userData.email ||
      !userData.gender ||
      !userData.status
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await fetch(url, {
      method: "POST",
      headers: req.authHeaders,
      body: JSON.stringify(userData),
    });

    const responseBody = await response.text();
    if (!response.ok) {
      // res.send(`error occured: ${responseBody}`)
      // response.send(`error occured: ${responseBody}`)
      console.log(response);
    }

    const data = JSON.parse(responseBody);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in POST /adduser:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint for /read
app.get("/", async (req, res) => {
  console.log("I'm in /");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: req.authHeaders,
    });

    const data = await response.json();
    // console.log("Data from external API:", data);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    console.log("error");
    res.status(500).json({ error: "An error occurred" });
  }
});
// let id  = '7520577'
app.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params;
  console.log("delete working");

  try {
    const response = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: req.authHeaders,
    });

    console.log("Response Status:", response.status);
    if (response.ok) {
      if (response.status === 204) {
        console.log("User not found but deleted successfully!");
        res.send({ message: "User deleted successfully!" });
      } else {
        const data = await response.json();
        console.log("User deleted:", data);
        res.send(data);
      }
    } else {
      console.error("Error occurred!");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500);
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
