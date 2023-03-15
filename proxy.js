const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const apiUrl = req.query.apiUrl;
    if (!apiUrl) {
      res.status(400).send("No apiUrl provided.");
      return;
    }

    const fetch = (await import("node-fetch")).default;
    const response = await fetch(apiUrl);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching.");
  }
});

app.listen(PORT, () => {
  console.log(`CORS proxy server is running on port ${PORT}`);
});
