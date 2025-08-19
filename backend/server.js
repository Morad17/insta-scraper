import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8000;

app.get("/get-profile", async (req, res) => {
  const url = "https://instagram120.p.rapidapi.com/api/instagram/profile";
  const username = req.query.username || "moradelb";
  const options = {
    method: "POST",
    url: url,
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_AUTH_KEY,
      "x-rapidapi-host": process.env.RAPID_API_HOST,
      "Content-Type": "application/json",
    },
    data: {
      username: username,
    },
  };
  try {
    const response = await axios(options);
    console.log(response.data); // Log to server console
    res.json(response.data); // Send to client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Initialise Node App//
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
